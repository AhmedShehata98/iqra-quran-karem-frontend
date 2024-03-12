<script setup lang="ts">
import { ref, reactive } from 'vue'
const { reciter } = defineProps<{ reciter: Reciter }>()
const emits = defineEmits(['onFavoriteClick'])
const cardColors = reactive([
  'green-darken-4',
  'brown-darken-4',
  'blue-grey-darken-4',
  'purple-darken-4',
  'indigo-darken-4',
])
const isShownOverlay = ref(true)
</script>
<template>
  <v-card
    :color="cardColors[Math.floor(Math.random() * cardColors.length)]"
    rounded
  >
    <v-img :src="reciter.img" height="230" cover>
      <v-overlay
        contained
        v-model="isShownOverlay"
        class="d-flex justify-center align-center"
      >
        <v-icon size="xxx-large">mdi-playlist-play</v-icon>
      </v-overlay>
    </v-img>
    <v-card-item class="pb-10 pt-6">
      <v-row>
        <v-col cols="7">
          <v-card-title class="text-body-1">{{ reciter.name }}</v-card-title>
        </v-col>
        <v-col cols="4" class="d-flex px-0 ga-2">
          <v-btn
            size="x-small"
            variant="text"
            icon="mdi-heart"
            class="text-body-2"
          ></v-btn>
          <v-btn
            size="x-small"
            variant="text"
            icon="mdi-play"
            class="text-h6"
          ></v-btn>
        </v-col>
      </v-row>
    </v-card-item>
  </v-card>
</template>
<style lang="css" scoped>
#reciter-card {
  max-width: 245px;
}

#reciter-card.isFavoriteReciter #favorite-reciter-btn #heart-outline {
  display: none !important;
}
#reciter-card.isFavoriteReciter #favorite-reciter-btn #heart {
  display: inline-block !important;
}
.v-card-item__content {
  height: 100% !important;
}
@media screen and (max-width: 576px) {
  #reciter-card {
    max-width: 225px;
    min-width: 225px;
  }
  .v-card-item {
    padding: 0.5rem;
  }
  .v-card-title {
    font-size: 17px;
  }
  .v-card-text {
    font-size: 12px !important;
  }
  .v-btn {
    width: 100%;
  }
}
</style>
