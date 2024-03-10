<template>
  <v-row>
    <v-col cols="12">
      <v-slider
        color="deep-purple-darken-4"
        v-model="audioPlayerState.volume"
        min="0"
        step="0.01"
        max="1"
        @update:modelValue="audioPlayerState.handleChangeVolume"
        append-icon="mdi-volume-high"
        @click:append="audioPlayerState.handleMuteVolume()"
      >
      </v-slider>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import { useAudioPlayerStore } from '@/stores/audioPlayerStore'

const audioPlayerState = useAudioPlayerStore()
</script>
