<template>
  <Head>
    <Title>{{ $t("ly.df.meta.title") }}</Title>
  </Head>
  <div class="HeaderContainer">
    <header class="Header">
      <NuxtLink to="/" class="Header-logo">
        <IconGamepad />
      </NuxtLink>
      <h1 class="Header-title">{{ $t("ly.df.meta.title") }}</h1>
      <NuxtLink to="/auth/login" class="Header-login">
        {{ $t("ly.df.header.login") }}
      </NuxtLink>
    </header>
  </div>
  <div class="MainContainer">
    <main class="Main">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts"></script>

<style scope lang="sass">
.HeaderContainer
  @include f-c-c()
  padding: .7rem
  .Header
    @include f-c-b()
    background-color: $dark-gray
    width: 100%
    max-width: 1500px
    padding: 1rem
    border-radius: 40px
    .Header-logo
      @include f-c-c()
      width: max-content
      height: max-content
      box-shadow: 0 0 7px $bright-green
      border-radius: 45%
      svg
        $width: 50px
        $height: calc( $width * 384px / 640px )
        width: $width
        height: $height
        fill: $bright-green
    .Header-logo:hover
      transform: scale(1.05)
    .Header-title
      display: none
      text-shadow: 0 0 10px $vivid-purple
    .Header-login
      @include font-audiowide(1.2rem)
      font-weight: bolder
      background-color: $electric-blue
      color: $dark-gray
      padding: .5rem
      border-radius: 20px
      text-decoration: none
      box-shadow: 0 0 7px $electric-blue
.MainContainer
  @include f-c-c()
  padding: 1rem
  .Main
    display: flex
    flex-direction: column
    width: 100%
    max-width: 1500px
    padding: 1rem

@media (min-width: 570px)
  .HeaderContainer
    .Header
      .Header-title
        display: block
</style>
