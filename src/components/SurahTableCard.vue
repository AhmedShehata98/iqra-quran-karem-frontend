<template>
  <tr
    :class="
      audioPlayerState.selectedMediaDetails !== null &&
      audioPlayerState.selectedMediaDetails.id === +props.suwarItems['ID'] &&
      !audioPlayerState.isPaused
        ? 'bg-teal-lighten-3 table-layout'
        : ''
    "
  >
    <td class="table-data t-id">{{ props.suwarItems["ID"] }}</td>
    <td class="table-data t-name">{{ props.suwarItems.surahName }}</td>
    <td class="table-data t-surah-location">
      {{ props.suwarItems.surahLocation }}
    </td>
    <td class="table-data t-moshaf-type">{{ props.suwarItems.moshafType }}</td>
    <td class="table-data t-actions">
      <v-btn
        v-if="
          audioPlayerState.selectedMediaDetails === null ||
          audioPlayerState.selectedMediaDetails.id !==
            +props.suwarItems['ID'] ||
          audioPlayerState.isPaused
        "
        icon="mdi-play"
        size="x-small"
        variant="tonal"
        color="cyan-darken-4"
        title="play-surah"
        @click="
          () =>
            audioPlayerState.play({
              volume: 0.65,
              mediaId: +props.suwarItems['ID'],
            })
        "
      >
      </v-btn>
      <v-btn
        v-if="
          audioPlayerState.selectedMediaDetails !== null &&
          audioPlayerState.selectedMediaDetails.id ===
            +props.suwarItems['ID'] &&
          !audioPlayerState.isPaused
        "
        icon="mdi-pause"
        size="x-small"
        :variant="
          audioPlayerState.selectedMediaDetails !== null &&
          audioPlayerState.selectedMediaDetails.id ===
            +props.suwarItems['ID'] &&
          !audioPlayerState.isPaused
            ? 'elevated'
            : 'tonal'
        "
        color="cyan-darken-4"
        title="pause-surah"
        @click="async () => await audioPlayerState.pauseMedia()"
      >
      </v-btn>
      <v-btn
        v-if="props.server && props.reciterName"
        size="x-small"
        icon="mdi-download"
        color="cyan-darken-3"
        :loading="isDownloading"
        @click="
          async () =>
            await downloadFile({
              url: `${props.server}${props.suwarItems['ID']}.mp3`,
              fileName: `${props.reciterName}-${props.suwarItems.surahName}.mp3`,
            })
        "
        class="ms-3"
      ></v-btn>
    </td>
  </tr>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useAudioPlayerStore } from "@/stores/audioPlayerStore";
// import { downloadFile } from '@/utils/helpers'
import useDownloadMedia from "@/hooks/useDownloadMedia";

const props = defineProps<{
  suwarItems: {
    ID: string;
    surahName: string;
    moshaf: string;
    surahLocation: string;
  };
  reciterName: string;
  server: string;
}>();

const audioPlayerState = useAudioPlayerStore();
const { isLoading: isDownloading, isError, downloadFile } = useDownloadMedia();
</script>
<style lang="css" scoped>
.table-data {
  padding: 0px;

  text-align: center;
  white-space: nowrap;
}
.table-data.t-actions {
  min-width: 120px;
  max-width: 120px;
}
.table-data.t-surah-location,
.table-data.t-name {
  min-width: 110px;
  max-width: 110px;
}
</style>
