<script setup lang="ts">
import { RouterView } from "vue-router";
import AudioPlayer from "./components/audio-player/AudioPlayer.vue";
</script>

<template>
  <v-layout>
    <RouterView />
    <AudioPlayer />
  </v-layout>
</template>

<style scoped lang="css">
/* nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
} */
</style>
