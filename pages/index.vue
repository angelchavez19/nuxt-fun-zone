<template>
  <section class="Games">
    <GamesCard v-for="(game, index) in games" :key="index" v-bind="game" />
  </section>
</template>

<script setup lang="ts">
const games = [{ name: "Tic Tac Toe", path: "tic-tac-toe" }];
</script>

<style scope lang="sass">
.Games
  @include f--c()
  width: 100%
  flex-wrap: wrap
  gap: 2rem
</style>
