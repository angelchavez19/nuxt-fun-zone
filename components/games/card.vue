<template>
  <NuxtLink :to="`/games/${path}`" class="GameCard">
    <img :src="`/${path}-image.png`" :alt="name" />
    <span>{{ name }}</span>
  </NuxtLink>
</template>

<script setup lang="ts">
interface Props {
  name: string;
  path: string;
}
defineProps<Props>();
</script>

<style scoped lang="sass">
$size: 150px

.GameCard
  @include f-c-c()
  width: $size
  height: $size
  border-radius: 20px
  outline: 1px solid $neon-orange
  box-shadow: 0 0 15px $neon-orange
  overflow: hidden
  position: relative
  img
    width: 100%
    height: 100%
    opacity: 1
    object-fit: cover
    transform: scale(1.1)
    transition: all .5s ease-in-out
  span
    @include font-press-start(1rem)
    text-align: center
    color: $neon-orange
    position: absolute
    width: 100%
    height: 100%
    background-color: #000000CC
    bottom: calc($size + 10px)
    opacity: 0
    visibility: hidden
    transition: all .3s ease-in-out
.GameCard:hover
  img
    transform: scale(1.2)
    transform: rotate(180deg)
  span
    @include f-c-c()
    bottom: 0
    opacity: 1
    visibility: visible
</style>
