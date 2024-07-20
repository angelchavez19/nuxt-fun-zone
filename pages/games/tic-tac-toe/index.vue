<template>
  <div>
    <button @click="createRoom">Create Room</button>
    <input v-model="roomId" placeholder="Room ID" />
    <button @click="joinRoom">Join Room</button>
  </div>
  <div>
    <p>Status: {{ isConnected ? "connected" : "disconnected" }}</p>
    <p>Transport: {{ transport }}</p>
  </div>
  <div v-show="!isPlaying && roomId">
    <button @click="handleClick">Init Game</button>
  </div>
  <h1>Board</h1>
  <h2>Player: {{ player }}</h2>
  <div class="Board-container">
    <GamesTicTacToeBoard
      :board="board"
      @handleClickOnBoard="handleClickOnBoard"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { io } from "socket.io-client";

const isConnected = ref(false);
const transport = ref("N/A");
const isPlaying = ref(false);
const board = ref<string[]>([]);
const player = ref<string>("");
const roomId = ref<string>("");

let socket: any = null;

function onConnect() {
  isConnected.value = true;
  transport.value = socket.io.engine.transport.name;

  socket.io.engine.on("upgrade", (rawTransport: any) => {
    transport.value = rawTransport.name;
  });
}

function onDisconnect() {
  isConnected.value = false;
  transport.value = "N/A";
}

function handleClick() {
  isPlaying.value = true;
  socket.emit("init", roomId.value);
}

function handleClickOnBoard(index: number) {
  socket.emit("move", roomId.value, index);
}

function createRoom() {
  socket.emit("createRoom");
}

function joinRoom() {
  socket.emit("joinRoom", roomId.value);
}

onMounted(() => {
  socket = io("http://localhost:3000");

  socket.on("connect", onConnect);

  socket.on("board", (_board: string[], _player: string) => {
    board.value = _board;
    player.value = _player;
  });

  socket.on("roomCreated", (newRoomId: string) => {
    roomId.value = newRoomId;
    console.log(`Room created: ${newRoomId}`);
  });

  socket.on("roomJoined", (joinedRoomId: string) => {
    console.log(`Joined room: ${joinedRoomId}`);
  });

  socket.on("disconnect", onDisconnect);
});

onBeforeUnmount(() => {
  if (socket) {
    socket.off("connect", onConnect);
    socket.off("disconnect", onDisconnect);
    socket.disconnect();
  }
});
</script>

<style lang="sass">
.Board-container
  @include f-c-c()
</style>
