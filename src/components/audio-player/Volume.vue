<template>
  <div class="volume">
    <v-slider
      color="deep-purple-darken-4"
      v-model="audioPlayerState.volume"
      min="0"
      step="0.01"
      max="1"
      @update:modelValue="audioPlayerState.handleChangeVolume"
      append-icon="mdi-volume-high"
      @click:append="audioPlayerState.handleMuteVolume()"
      track-color="grey-darken-3"
      thumb-color="grey-darken-2"
    >
    </v-slider>
  </div>
</template>
<script setup lang="ts">
import { useAudioPlayerStore } from '@/stores/audioPlayerStore'

const audioPlayerState = useAudioPlayerStore()
</script>
<style scoped lang="css">
.volume {
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
