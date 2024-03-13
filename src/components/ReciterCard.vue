<script setup lang="ts">
import { ref, reactive } from "vue";
import { RouterLink } from "vue-router";

const { reciter, isActive } = defineProps<{
  reciter: Reciter;
  isActive: boolean;
}>();
const emits = defineEmits(["onFavoriteClick"]);
const cardColors = reactive([
  "green-darken-4",
  "brown-darken-4",
  "blue-grey-darken-4",
  "purple-darken-4",
  "indigo-darken-4",
]);
const isShownOverlay = ref(true);
</script>
<template>
  <v-card
    :color="cardColors[Math.floor(Math.random() * cardColors.length)]"
    elevation="8"
    hover
    ripple
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
      <v-row justify="space-between">
        <v-col cols="12" xs="12" sm="12" md="7">
          <v-card-title class="text-body-1">{{ reciter.name }}</v-card-title>
        </v-col>
        <v-col
          cols="12"
          xs="12"
          sm="12"
          md="4"
          class="d-flex align-center justify-center px-0 ga-2"
        >
          <v-btn
            size="x-small"
            :icon="isActive ? 'mdi-heart' : 'mdi-heart-outline'"
            @click="emits('onFavoriteClick')"
            width="35px"
            height="35px"
            class="text-body-2"
          ></v-btn>
          <router-link :to="`/reciter/${reciter.id}`">
            <v-btn
              size="x-small"
              icon="mdi-play"
              width="35px"
              height="35px"
              class="text-h6"
            >
            </v-btn>
          </router-link>
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
