// eslint-disable-next-line vue/multi-word-component-names
<template>
  <v-row class="w-50 items-center justify-center">
    <v-col cols="8" class="d-flex align-center justify-center ga-6">
      <v-btn
        title="السابق"
        variant="tonal"
        icon
        color="deep-purple-darken-4"
        @click="audioPlayerState.setPrevMedia()"
        :aria-disabled="audioPlayerState.isFirstMediaElem"
        :disabled="audioPlayerState.isFirstMediaElem"
      >
        <v-icon>mdi-skip-backward</v-icon>
      </v-btn>
      <v-btn
        v-if="audioPlayerState.isPaused"
        variant="tonal"
        icon
        size="x-large"
        color="deep-purple-darken-4"
        @click="audioPlayerState.playMedia()"
      >
        <v-icon>mdi-play</v-icon>
      </v-btn>
      <v-btn
        v-if="!audioPlayerState.isPaused"
        variant="tonal"
        icon
        size="x-large"
        color="deep-purple-darken-4"
        @click="audioPlayerState.pauseMedia()"
      >
        <v-icon>mdi-pause</v-icon>
      </v-btn>
      <v-btn
        title="التالي"
        :aria-disabled="audioPlayerState.isLastMediaElem"
        :disabled="audioPlayerState.isLastMediaElem"
        variant="tonal"
        icon
        color="deep-purple-darken-4"
        @click="audioPlayerState.setNextMedia()"
      >
        <v-icon>mdi-skip-forward</v-icon>
      </v-btn>
    </v-col>
    <v-col cols="4" class="d-flex align-center justify-start">
      <v-btn variant="tonal" icon color="deep-purple-darken-4">
        <v-icon>mdi-shuffle-variant</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
const props = defineProps(['isLastMediaElem', 'isFirstMediaElem'])
import { audioTimeFormat } from '@/utils/audioTimeFormat'
import { useAudioPlayerStore } from '@/stores/audioPlayerStore'
const audioPlayerState = useAudioPlayerStore()

// const emits = defineEmits([
//   'onPause',
//   'onPlay',
//   'onShuffle',
//   'onForward',
//   'onBackward',
// ])
</script>
<style scoped>
.controls {
  @apply shrink-0 flex items-center justify-center gap-5;
}
</style>
