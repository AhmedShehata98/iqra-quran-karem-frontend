<script setup lang="ts">
import { ref } from "vue";
const { reciter } = defineProps<{ reciter: Reciter }>();
const emits = defineEmits(["onFavoriteClick"]);
const isShownOverlay = ref(true);
</script>
<template>
  <v-card
    variant="flat"
    class="w-25 flex-shrink-0"
    color="cyan-darken-3"
    id="reciter-card"
  >
    <v-img
      class="align-end text-white"
      :src="reciter.img || undefined"
      height="200"
      cover
    >
      <v-overlay contained v-model="isShownOverlay">
        <v-btn
          id="favorite-reciter-btn"
          color="grey-darken-4"
          variant="elevated"
          class="ma-2"
          size="small"
          icon
          @click="(ev: Event) => emits('onFavoriteClick', ev)"
        >
          <v-icon id="heart-outline" size="x-large">mdi-heart-outline</v-icon>
          <v-icon id="heart" class="d-none" size="x-large">mdi-heart</v-icon>
        </v-btn>
      </v-overlay>
    </v-img>
    <v-card-item>
      <v-card-title>{{ reciter.name }}</v-card-title>
      <v-card-text v-if="reciter.bio" class="text-caption">{{
        reciter.bio.slice(0, 62) + "..." || "لا تتوفر معلومات عنه"
      }}</v-card-text>
      <v-card-actions class="mt-auto">
        <v-btn
          color="orange-lighten-3"
          variant="flat"
          prepend-icon="mdi-playlist-play"
          :href="`reciter/${reciter.id}`"
        >
          <p>قائمة التشغيل</p>
        </v-btn>
      </v-card-actions>
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
