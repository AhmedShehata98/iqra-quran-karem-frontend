<template>
  <v-navigation-drawer
    location="bottom"
    color="grey-lighten-3"
    v-model="state.isShownPlayer"
  >
    <v-card class="h-100 pa-4">
      <div class="w-100 d-flex flex-column items-center justify-center ga-2">
        <div class="w-100 d-flex items-center justify-between ga-4">
          <TrackElement
            :trackName="state.selectedMediaDetails?.name || 'لم تختار بعد'"
            :isMekkia="state.selectedMediaDetails?.mekkia || 'لم تختار بعد'"
            :trackThumbnail="surahThumbnail"
          />
          <Controls />
          <Volume />
        </div>
        <ProcessBar />
      </div>
    </v-card>
  </v-navigation-drawer>
</template>
<script setup lang="ts">
import surahThumbnail from '@/assets/quran.png'
import { useAudioPlayerStore } from '@/stores/audioPlayerStore'
import { audioTimeFormat } from '@/utils/audioTimeFormat'
import TrackElement from './TrackElement.vue'
import Controls from './Controls.vue'
import ProcessBar from './ProcessBar.vue'
import Volume from './Volume.vue'

//state
//
const state = useAudioPlayerStore()
</script>

<style lang="css" scoped>
.v-navigation-drawer--bottom {
  height: 144px !important;
}
</style>
