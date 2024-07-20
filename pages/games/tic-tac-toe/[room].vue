<template>
  <div>
    <p>Status: {{ isConnected ? "connected" : "disconnected" }}</p>
    <p>Transport: {{ transport }}</p>
  </div>
  <div v-show="!isPlaying">
    <button @click="handleClick">Init Game</button>
  </div>
  <h1>Board</h1>
  <h2>Player: {{ player }}</h2>
  <GamesTicTacToeBoard
    :board="board"
    @handleClickOnBoard="handleClickOnBoard"
  />
</template>

<script setup lang="ts">
import { socket } from "~/components/socket";

const isConnected = ref(false);
const transport = ref("N/A");
const isPlaying = ref(false);
const board: Ref<string[]> = ref([]);
const player: Ref<string> = ref("");

if (socket.connected) {
  onConnect();
}

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
  socket.emit("init");
}

function handleClickOnBoard(index: number) {
  socket.emit("move", index);
}

socket.on("connect", onConnect);
socket.on("board", (_board: string[], _player: string) => {
  board.value = _board;
  player.value = _player;
});
socket.on("disconnect", onDisconnect);

onBeforeUnmount(() => {
  socket.off("connect", onConnect);
  socket.off("disconnect", onDisconnect);
});
</script>

<style lang="sass"></style>
