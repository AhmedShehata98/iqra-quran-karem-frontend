<template>
  <v-app-bar class="bg-teal-lighten-1">
    <v-app-bar-nav-icon :onclick="handleCloseMenu"></v-app-bar-nav-icon>
    <v-app-bar-title>قائمة السور</v-app-bar-title>
    <v-btn
      icon
      @click="
        audioPlayerState.setToggleShowPlayer(!audioPlayerState.isShownPlayer)
      "
    >
      <v-icon> mdi-music-note </v-icon>
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
              <v-item-group
                v-model="selectedMoshafId"
                class="py-2 px-4"
                mandatory
              >
                <v-item
                  v-for="moshafType in reciterDetails?.reciter.moshaf"
                  :key="moshafType.id"
                  v-slot="{ isSelected, toggle }"
                  :value="moshafType.id"
                >
                  <v-btn
                    variant="flat"
                    :color="isSelected ? 'cyan-darken-4' : 'grey-lighten-2'"
                    @click="
                      () => {
                        handleSelectMoshafType(toggle)
                      }
                    "
                  >
                    {{ moshafType.name }}
                  </v-btn>
                </v-item>
              </v-item-group>
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
            <template v-if="isFetchedReciterDetails && suwarItems">
              <v-table
                hover
                density="comfortable"
                height="65vh"
                fixed-footer
                fixed-header
                :loading="isLoadingMoshaf"
              >
                <thead>
                  <tr>
                    <th v-for="head in suwarHeaders" :key="head.key">
                      {{ head.title }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <surah-table-card
                    v-for="item in suwarItems.filter((surah: any) =>
                      surah.surahName
                        .toLowerCase()
                        .startsWith(searchTerm.toLowerCase()),
                    )"
                    :key="item['ID']"
                    :suwarItems="item"
                    :reciterName="reciterDetails.reciter.name"
                    :server="moshaf.moshafType.server"
                  ></surah-table-card>
                </tbody>

                <tfoot>
                  <tr class="bg-cyan-darken-4">
                    <td colspan="2">
                      <div class="d-flex ga-3 align-center justify-center">
                        <p>غدد العناصر</p>
                        <p>112</p>
                      </div>
                    </td>
                    <td colspan="4"></td>
                  </tr>
                </tfoot>
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
import SurahTableCard from '@/components/SurahTableCard.vue'
import { useSideMenuState } from '@/stores/sideMenuState'
import { useAudioPlayerStore } from '@/stores/audioPlayerStore'
import {
  ref,
  watch,
  computed,
  toRaw,
  onMounted,
  onBeforeMount,
  onCreated,
  onBeforeCreated,
  onUpdated,
} from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'
import { getReciterDetails, getAllMoshafWays } from '@/constants/quran'
import { prefixSurahNumber } from '@/utils/helpers'

// states

const route = useRoute()
const {
  isLoading,
  isFetched: isFetchedReciterDetails,
  isError,
  error,
  data: reciterDetails,
} = useQuery({
  queryKey: ['reciter-details', route.params.reciterId.toString()],
  queryFn: () => getReciterDetails(route.params.reciterId.toString()),
})

const selectedMoshafId = ref(null)
const {
  data: moshaf,
  isLoading: isLoadingMoshaf,
  isFetched: isFetchedMoshaf,
  refetch: refetchMoshaf,
} = useQuery({
  queryKey: [
    'moshaf',
    isFetchedReciterDetails.value,
    route.params.reciterId,
    selectedMoshafId.value,
  ],
  queryFn: () =>
    getAllMoshafWays({
      reciterId: route.params.reciterId.toString(),
      moshafId:
        selectedMoshafId.value || reciterDetails.value.reciter.moshaf[0].id,
    }),
})
const sideMenuState = useSideMenuState()
const audioPlayerState = useAudioPlayerStore()
const searchTerm = ref('')
const suwarHeaders = [
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
  {
    key: 'احراءات',
    title: 'احراءات',
  },
]

//computed
const suwarItems = computed(() => {
  if (isFetchedMoshaf.value) {
    const suwar = toRaw(moshaf.value).moshafType.suwar
    return suwar.map((m: Surah) => ({
      ID: prefixSurahNumber(m.id),
      surahName: m.name,
      surahLocation: m.mekkia === 1 ? 'مكة' : 'المدينة',
      moshafType: toRaw(moshaf.value).moshafType.name,
    }))
  }
  return []
})

// methods
const handleCloseMenu = () => sideMenuState.setToggle()
const handleSelectMoshafType = (toggle: () => void) => {
  toggle()
  refetchMoshaf()
}

// watchers

watch(
  () => [moshaf.value],
  () => {
    if (moshaf.value) {
      audioPlayerState.setInitialStateData({
        mediaList: moshaf.value.moshafType.suwar,
        serverURL: moshaf.value.moshafType.server,
      })
    }
  },
)
</script>

<style lang="css" scoped></style>
