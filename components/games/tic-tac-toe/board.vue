<template>
  <div class="Board">
    <div class="Board-cell" v-for="(cell, index) in board" :key="index">
      <span v-if="cell">{{ cell }}</span>
      <button v-else @click="$emit('handleClickOnBoard', index)"></button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  board: string[];
}
defineProps<Props>();
defineEmits(["handleClickOnBoard"]);
</script>

<style scope lang="sass">
.Board
  display: grid
  grid-template-columns: repeat(3, 1fr)
  grid-template-rows: repeat(3, 1fr)
  $board-width: 300px
  width: $board-width
  gap: .5rem
  .Board-cell
    @include f-c-c()
    width: calc( $board-width / 3 - .1rem )
    height: calc( $board-width / 3 - .1rem )
    outline: 3px solid $light-gray
    border-radius: 5px
    span
      @include font-audiowide(4rem)
    button
      width: 100%
      height: 100%
      background-color: $dark-gray
      border: none
</style>
