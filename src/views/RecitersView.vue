<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import ReciterCard from '@/components/ReciterCard.vue'
import { useQuery } from '@tanstack/vue-query'
import { getAllReciters } from '@/constants/quran'
import { useReciterState } from '@/stores/reciterState'
import { useSideMenuState } from '@/stores/sideMenuState'
import SideMenu from '@/components/SideMenu.vue'
const sideMenuState = useSideMenuState()
// Import Swiper styles
import 'swiper/css'

const {
  data: responseReciters,
  isError: isRecitersError,
  error: recitersError,
  isLoading,
  isFetched,
  refetch,
} = useQuery({
  queryKey: ['reciters'],
  queryFn: () => getAllReciters({ page: page.value, limit: limit.value }),
})
// states
//
const reciterState = useReciterState()
const isOffline = ref(false)
const scrollOffset = ref(0)
const limit = ref(25)
const page = ref(1)

// methods
//
const handleCloseMenu = () => sideMenuState.setToggle()

function handleFavorites(data: Reciter, ev: Event) {
  const reciterCardRef = (ev.target as HTMLButtonElement).closest(
    '#reciter-card',
  )
  const isFavoriteReciter =
    reciterCardRef?.classList.contains('isFavoriteReciter')
  if (isFavoriteReciter) {
    reciterState.removeFavoriteReciter(data.id)
  } else {
    reciterState.setFavoriteReciter(data)
  }

  console.log(reciterCardRef)
}

function determineScrollY() {
  const offsetTop = window.pageYOffset || window.screenY
  scrollOffset.value = offsetTop
}
function goTop() {
  document.body.scrollIntoView({ behavior: 'smooth' })
}
function handleShowMore() {
  page.value += 1
  refetch()
}

// listeners
//
window.addEventListener('online', () => {
  isOffline.value = false
})
window.addEventListener('offline', () => {
  isOffline.value = true
})

window.addEventListener('scroll', determineScrollY)

onUnmounted(() => {
  window.removeEventListener('offline', () => {
    isOffline.value = true
  })
  window.removeEventListener('online', () => {
    isOffline.value = false
  })
  window.removeEventListener('scroll', determineScrollY)
})
</script>

<template>
  <v-app-bar class="bg-teal-lighten-1">
    <v-app-bar-nav-icon :onclick="handleCloseMenu"></v-app-bar-nav-icon>
    <v-app-bar-title class="text-uppercase"> القراء </v-app-bar-title>
    <v-btn icon>
      <v-icon> mdi-magnify </v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-app-bar>
  <side-menu></side-menu>
  <v-main class="h-screen d-flex flex-column items-start justify-start">
    <div class="w-100 d-flex position-relative">
      <v-progress-linear
        v-if="isLoading"
        height="4"
        color="teal-darken-1"
        indeterminate
      ></v-progress-linear>
    </div>
    <div class="w-100 d-flex position-relative">
      <v-alert
        v-if="isOffline"
        title="انقطع الانترنت"
        text="انقطع اتصال الانترنت ربما يحدث مشكلة بالتطبيق او يتوقف المقطع الصوتي."
        type="warning"
        icon="mdi-wifi-off"
        closable
      >
      </v-alert>
    </div>
    <v-container>
      <v-row
        v-if="
          reciterState.favoriteReciters &&
          reciterState.favoriteReciters.length > 0
        "
        class="flex-column"
      >
        <h4 class="mt-6 text-capitalize">القراء المفضلين لك</h4>
        <v-col>
          <v-sheet class="mb-3 pa-3" color="grey-lighten-3" rounded="12">
            <v-slide-group show-arrows height="425" class="ga-3 py-2">
              <v-slide-group-item
                v-for="reciter in reciterState.favoriteReciters"
                :key="reciter.id"
              >
                <reciter-card
                  :reciter="reciter"
                  max-width="240"
                  :class="
                    reciterState.isFavoriteReciter(reciter.id) &&
                    'isFavoriteReciter ma-2'
                  "
                  @onFavoriteClick="(ev) => handleFavorites(reciter, ev)"
                ></reciter-card>
              </v-slide-group-item>
            </v-slide-group>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row class="flex-column">
        <h4 class="mt-6 text-capitalize">قائمة القراء</h4>
        <v-alert
          v-if="isRecitersError"
          type="error"
          icon="mdi-server-network"
          title="حدثت مشكلة اثناء جلب القراء"
          :text="
            recitersError?.message || 'مشكلة , حدث خطأ ما برجاء المحاولة مجددأ'
          "
        ></v-alert>

        <v-col v-if="isFetched && responseReciters">
          <v-sheet
            v-for="items in responseReciters.reciters"
            :key="items.letter"
            class="mb-10 pa-3"
            color="grey-lighten-3"
            rounded="12"
          >
            <div class="mb-4 mt-2">
              <b>أسم يبدأ بحرف </b>
              <v-chip variant="tonal" color="gray" class="px-5 text-uppercase">
                {{ items.letter }}</v-chip
              >
            </div>
            <v-slide-group show-arrows height="425" mandatory class="ga-3 py-2">
              <v-slide-group-item
                v-for="reciter in items.data"
                :key="reciter.id"
              >
                <reciter-card
                  :reciter="reciter"
                  :class="
                    reciterState.isFavoriteReciter(reciter.id)
                      ? 'isFavoriteReciter ma-2'
                      : 'ma-2'
                  "
                  @onFavoriteClick="(ev) => handleFavorites(reciter, ev)"
                ></reciter-card>
              </v-slide-group-item>
            </v-slide-group>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row class="mb-6">
        <v-btn
          v-if="responseReciters"
          block
          color="grey-lighten-2"
          variant="flat"
          :loading="isLoading"
          append-icon="mdi-reload"
          :aria-disabled="responseReciters.hasNext === false"
          :disabled="responseReciters.hasNext === false"
          @click="handleShowMore"
          >load more</v-btn
        >
      </v-row>
    </v-container>
    <v-btn
      color="purple-darken-3"
      icon="mdi-chevron-up"
      elevation="8"
      size="large"
      @click="goTop"
      :class="scrollOffset >= 250 ? 'go-top-btn' : 'go-top-btn hidden-btn'"
    ></v-btn>
  </v-main>
</template>
<style scoped>
.go-top-btn {
  position: fixed;
  z-index: 50;
  top: 85%;
  left: 2%;
  transition: scale 0.3s ease-in-out;
}
.go-top-btn.hidden-btn {
  scale: 0.5;
  opacity: 0;
}

@media screen and (max-width: 768px) {
  .v-slide-group__prev,
  .v-slide-group__next {
    display: none !important;
  }
}
</style>
