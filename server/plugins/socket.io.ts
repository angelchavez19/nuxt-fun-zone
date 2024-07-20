import type { NitroApp } from "nitropack";
import { Server as Engine } from "engine.io";
import { Server } from "socket.io";
import { defineEventHandler } from "h3";

const rooms = new Map<string, { board: string[]; player: "O" | "X" }>();

export default defineNitroPlugin((nitroApp: NitroApp) => {
  const engine = new Engine();
  const io = new Server();

  io.bind(engine);

  io.on("connection", (socket) => {
    console.log("Usuario conectado");

    // Manejo para crear una sala
    socket.on("createRoom", () => {
      const roomId = `room_${Date.now()}`;
      socket.join(roomId);

      rooms.set(roomId, {
        board: ["", "", "", "", "", "", "", "", ""],
        player: "O",
      });

      socket.emit("roomCreated", roomId);
      console.log(`Sala creada: ${roomId}`);
    });

    socket.on("joinRoom", (roomId: string) => {
      socket.join(roomId);
      socket.emit("roomJoined", roomId);
      console.log(`Usuario se unió a la sala: ${roomId}`);

      const room = rooms.get(roomId);
      if (room) {
        socket.emit("board", room.board, room.player);
      }
    });

    socket.on("init", (roomId: string) => {
      const room = rooms.get(roomId);
      if (room) {
        socket.emit("board", room.board, room.player);
      }
    });

    socket.on("move", (roomId: string, index: number) => {
      console.log(roomId, index);

      const room = rooms.get(roomId);
      if (room) {
        room.board[index] = room.player;
        room.player = room.player === "O" ? "X" : "O";

        io.to(roomId).emit("board", room.board, room.player);
      }
    });

    socket.on("disconnect", () => {
      console.log("Usuario desconectado");
    });
  });

  nitroApp.router.use(
    "/socket.io/",
    defineEventHandler({
      handler(event) {
        engine.handleRequest(event.node.req, event.node.res);
        event._handled = true;
      },
      websocket: {
        open(peer) {
          const nodeContext = peer.ctx.node;
          const req = nodeContext.req;

          // @ts-expect-error private method
          engine.prepare(req);

          const rawSocket = nodeContext.req.socket;
          const websocket = nodeContext.ws;

          // @ts-expect-error private method
          engine.onWebSocket(req, rawSocket, websocket);
        },
      },
    })
  );
});
