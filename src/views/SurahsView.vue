<template>
  <v-app-bar class="bg-indigo-darken-4">
    <v-app-bar-nav-icon :onclick="handleCloseMenu"></v-app-bar-nav-icon>
    <v-app-bar-title>قائمة السور</v-app-bar-title>
    <v-btn icon>
      <v-icon> mdi-magnify </v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-app-bar>
  <side-menu></side-menu>
  <v-main>
    <div class="w-100 d-flex position-relative">
      <v-progress-linear
        v-if="isLoading"
        height="4"
        color="teal-darken-1"
        indeterminate
      ></v-progress-linear>
    </div>
    <v-container>
      <v-row>
        <v-col xs="12" sm="12" md="6" lg="4" cols="12">
          <v-sheet rounded="18" elevation="1">
            <v-card :loading="isLoading" rounded="14" color="grey-lighten-4">
              <v-img
                :src="reciterDetails?.reciter.img"
                height="280"
                cover
              ></v-img>
              <v-card-item>
                <v-card-title>{{ reciterDetails?.reciter.name }}</v-card-title>
                <v-card-text>{{ reciterDetails?.reciter.bio }}</v-card-text>
              </v-card-item>
              <v-chip-group
                selected-class="cyan-darken-4"
                class="bg-grey-lighten-2"
                variant="flat"
                mandatory
              >
                <v-chip
                  v-for="moshafType in reciterDetails?.reciter.moshaf"
                  :key="moshafType.id"
                  @click="() => handleSelectMoshafType(moshafType.id)"
                >
                  {{ moshafType.name }}
                </v-chip>
              </v-chip-group>
            </v-card>
          </v-sheet>
        </v-col>
        <v-col xs="12" sm="12" md="6" lg="8" cols="12">
          <v-card
            tonal
            color="cyan-darken-4"
            class="text-white"
            title="قائمة السور"
          >
            <template v-slot:text>
              <v-text-field
                v-model="searchTerm"
                label="بحث في السور"
                prepend-inner-icon="mdi-magnify"
                variant="filled"
                color="blue"
                hide-details
                single-line
              ></v-text-field>
            </template>
            <template v-if="isFetched">
              <!-- <v-data-table
                :headers="suwarHeaders"
                :items="suwarItems"
                :item-value="(item: any) => item.ID"
                v-model="selectedSurah"
                :search="searchTerm"
                select-strategy="single"
                :loading="isLoading"
                density="comfortable"
                show-select
                hover
              >
              </v-data-table> -->
              <v-table hover density="comfortable" height="65vh">
                <thead>
                  <tr>
                    <th v-for="head in suwarHeaders" :key="head.key">
                      {{ head.title }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in suwarItems" :key="item['ID']">
                    <td>{{ item['ID'] }}</td>
                    <td>{{ item.surahName }}</td>
                    <td>{{ item.surahLocation }}</td>
                    <td>{{ item.moshafType }}</td>
                    <td>
                      <v-btn
                        v-if="
                          audioPlayerState.selectedMediaDetails === null ||
                          audioPlayerState.selectedMediaDetails.id !==
                            +item['ID']
                        "
                        icon
                        size="x-small"
                        variant="tonal"
                        color="cyan-darken-4"
                        title="play-surah"
                        @click="
                          () =>
                            audioPlayerState.handleGetPlayData({
                              volume: 0.7,
                              mediaId: +item['ID'],
                              cb: async (isSuccess) =>
                                isSuccess
                                  ? await audioPlayerState.playMedia()
                                  : null,
                            })
                        "
                      >
                        <v-icon>mdi-play</v-icon>
                      </v-btn>
                      <v-btn
                        v-if="
                          audioPlayerState.selectedMediaDetails !== null &&
                          audioPlayerState.selectedMediaDetails.id ===
                            +item['ID']
                        "
                        icon
                        size="x-small"
                        variant="tonal"
                        color="cyan-darken-4"
                        title="pause-surah"
                        @click="() => audioPlayerState.pauseMedia()"
                      >
                        <v-icon>mdi-pause</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </template>
          </v-card>
        </v-col>
      </v-row>
      <v-row></v-row>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import SideMenu from '@/components/SideMenu.vue'
import { useSideMenuState } from '@/stores/sideMenuState'
import { useAudioPlayerStore } from '@/stores/audioPlayerStore'
import { ref, watch, computed, toRaw, onMounted } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'
import { getReciterDetails } from '@/constants/quran'
import { prefixSurahNumber } from '@/utils/helpers'

// states

const route = useRoute()
const {
  isLoading,
  isFetched,
  isError,
  error,
  data: reciterDetails,
} = useQuery({
  queryKey: ['reciter-details', route.params.reciterId.toString()],
  queryFn: () => getReciterDetails(route.params.reciterId.toString()),
})
const sideMenuState = useSideMenuState()
const audioPlayerState = useAudioPlayerStore()
const searchTerm = ref('')
let selectedMoshafIdx = ref(0)
const suwarHeaders = [
  // {
  //   align: 'start',
  //   key: 'ID',
  //   sortable: true,
  //   title: 'ID',
  // },
  {
    key: 'ID',
    title: 'ID',
  },
  {
    key: 'أسم السورة',
    title: 'أسم السورة',
  },
  {
    key: 'مكان النزول',
    title: 'مكان النزول',
  },
  {
    key: 'نوع التلاوة',
    title: 'نوع التلاوة',
  },
]

//computed
const suwarItems = computed(() => {
  if (isFetched && reciterDetails.value) {
    const moshafTarget = toRaw(reciterDetails.value).reciter.moshaf[
      selectedMoshafIdx.value
    ]
    return moshafTarget.suwar.map((m: Surah) => ({
      ID: prefixSurahNumber(m.id),
      surahName: m.name,
      surahLocation: m.mekkia === 1 ? 'مكة' : 'المدينة',
      moshafType: moshafTarget.name,
    }))
  }
  return []
})

// methods
const handleCloseMenu = () => sideMenuState.setToggle()
const handleSelectMoshafType = (moshafId: number) => {
  if (isFetched && reciterDetails.value) {
    const moshafType = toRaw(reciterDetails.value).reciter.moshaf.findIndex(
      (m: Moshaf) => m.id === moshafId,
    )
    selectedMoshafIdx.value = moshafType
  }
}

// watchers

watch(
  () => [isFetched, reciterDetails.value, selectedMoshafIdx.value],
  () => {
    if (isFetched && reciterDetails.value) {
      const moshafTarget = toRaw(reciterDetails.value).reciter.moshaf[
        selectedMoshafIdx.value
      ]
      audioPlayerState.setInitialStateData({
        mediaList: moshafTarget.suwar,
        serverURL: moshafTarget.server,
      })
    }
  },
)

onMounted(() => {
  if (isFetched && reciterDetails.value) {
    selectedMoshafIdx.value = toRaw(reciterDetails.value).reciter.moshaf.at(0)
  }
})
</script>

<style lang="css" scoped></style>
