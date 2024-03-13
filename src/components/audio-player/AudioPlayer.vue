<template>
  <v-navigation-drawer
    location="bottom"
    color="green-lighten-5"
    v-model="state.isShownPlayer"
    :scrim="false"
    elevation="6"
  >
    <v-container fluid>
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="4">
          <TrackElement
            :trackName="state.selectedMediaDetails?.name || 'لم تختار بعد'"
            :isMekkia="state.selectedMediaDetails?.mekkia || 'لم تختار بعد'"
            :trackThumbnail="surahThumbnail"
          />
        </v-col>
        <v-col cols="12" xs="12" sm="12" md="4">
          <Controls />
        </v-col>
        <v-col class="volume-wrapper" cols="12" xs="12" sm="12" md="4">
          <Volume />
        </v-col>
      </v-row>
      <v-row class="mt-0">
        <v-col>
          <ProcessBar />
        </v-col>
      </v-row>
    </v-container>
  </v-navigation-drawer>
</template>
<script setup lang="ts">
import surahThumbnail from "@/assets/quran.png";
import { useAudioPlayerStore } from "@/stores/audioPlayerStore";
import { audioTimeFormat } from "@/utils/audioTimeFormat";
import TrackElement from "./TrackElement.vue";
import Controls from "./Controls.vue";
import ProcessBar from "./ProcessBar.vue";
import Volume from "./Volume.vue";

//state
//
const state = useAudioPlayerStore();
</script>

<style lang="css" scoped>
.v-navigation-drawer--bottom {
  height: 145px !important;
  overflow: hidden;
}

.volume-wrapper {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
@media screen and (max-width: 768px) {
  .v-navigation-drawer--bottom {
    height: auto !important;
  }
  .v-navigation-drawer__content {
    overflow-y: hidden;
  }
  .volume-wrapper {
    display: none;
  }
}
</style>
