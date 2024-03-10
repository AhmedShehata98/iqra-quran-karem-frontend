<template>
  <v-row class="align-center justify-center">
    <!-- <code class="current-time">{{ props.currentTime }}</code> -->
    <v-col cols="12">
      <v-slider
        color="purple-darken-4"
        :max="audioPlayerState.durationTime"
        v-model="audioPlayerState.currentTime"
        thumb-label="always"
        thumb-size="15"
        @update:modelValue="audioPlayerState.handleUpdateCurrentTime"
      >
        <template v-slot:prepend>
          <p class="text-caption">
            {{ audioTimeFormat(audioPlayerState.durationTime) }}
          </p>
        </template>
        <template v-slot:thumb-label="{ modelValue }">
          {{ audioTimeFormat(modelValue) }}
        </template>
      </v-slider>
    </v-col>
  </v-row>
</template>
<script lang="ts" setup>
import { audioTimeFormat } from '@/utils/audioTimeFormat'
import { useAudioPlayerStore } from '@/stores/audioPlayerStore'

const audioPlayerState = useAudioPlayerStore()
</script>
<style scoped lang="css">
.process-bar {
  @apply max-md:w-full w-10/12 flex items-center gap-2;
}
.seek-bar {
  -webkit-appearance: none;
  @apply w-full h-4 max-md:h-3 rounded-lg shadow-inner bg-light-third-900 overflow-hidden;
}
.seek-bar::-webkit-slider-thumb {
  -webkit-appearance: none;
  box-shadow: 400px 0 0 400px var(--tw-shadow-color);
  @apply h-6 w-2 cursor-pointer rounded bg-light-secondary-100 !shadow-light-secondary-500 hover:brightness-125;
}
.current-time,
.duration-time {
  font-weight: 700;
  @apply text-light-secondary-300;
}
</style>
