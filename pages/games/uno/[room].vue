<template>
  <span>{{ roomId }}</span>
</template>

<script setup lang="ts">
const {
  params: { room },
} = useRoute();
const roomId = room.toString();
</script>

<style scope lang="sass"></style>
