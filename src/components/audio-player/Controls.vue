// eslint-disable-next-line vue/multi-word-component-names
<template>
  <div class="controls">
    <span>
      <v-btn
        title="السابق"
        variant="tonal"
        icon
        color="deep-purple-darken-4"
        @click="prev()"
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
        @click="audioPlayerState.resume()"
      >
        <v-icon>mdi-play</v-icon>
      </v-btn>
      <v-btn
        v-if="!audioPlayerState.isPaused"
        variant="tonal"
        icon
        size="x-large"
        color="deep-purple-darken-4"
        @click="audioPlayerState.pause()"
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
        @click="next()"
      >
        <v-icon>mdi-skip-forward</v-icon>
      </v-btn>
    </span>
    <span>
      <v-btn
        :variant="audioPlayerState.isShuffled ? 'flat' : 'tonal'"
        icon
        color="deep-purple-darken-4"
        @click="audioPlayerState.setShuffleMedia()"
      >
        <v-icon>mdi-shuffle-variant</v-icon>
      </v-btn>
    </span>
  </div>
</template>
<script setup lang="ts">
const props = defineProps(["isLastMediaElem", "isFirstMediaElem"]);
import { useAudioPlayerStore } from "@/stores/audioPlayerStore";
const audioPlayerState = useAudioPlayerStore();

function next() {
  if (audioPlayerState.isShuffled) {
    audioPlayerState.nextShuffled();
  } else {
    audioPlayerState.next();
  }
}
function prev() {
  if (audioPlayerState.isShuffled) {
    audioPlayerState.nextShuffled();
  } else {
    audioPlayerState.prev();
  }
}

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
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.controls > :nth-child(1) {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
.controls > :nth-child(2) {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-inline-end: 1.5rem;
  padding-inline-start: 3.5rem;
}
.controls > :nth-child(1) {
  margin-block: auto;
}
@media screen and (max-width: 768px) {
  .controls > :nth-child(2) {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-inline-end: 0;
    padding-inline-start: 0;
  }
}
</style>
