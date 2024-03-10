<template>
  <v-sheet width="25%">
    <v-row>
      <v-col cols="3">
        <figure class="w-12 h-12 m-0 max-md:w-10 max-md:h-10">
          <img :src="props.trackThumbnail" alt="thumbnail.png" />
        </figure>
      </v-col>
      <v-col cols="9">
        <v-row>
          <v-col cols="12" class="pb-0">
            <b>{{ props.trackName }}</b>
          </v-col>
          <v-col cols="12" class="pt-0">
            <small class="text-light-secondary-400">{{
              props.isMekkia === 1 ? "مكية" : "مدنية"
            }}</small>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-sheet>
</template>
<script lang="ts" setup>
const props = defineProps(["trackThumbnail", "trackName", "isMekkia"]);
</script>
<style scoped>
.track-element {
  @apply flex items-center justify-start gap-3 max-tablet:order-2 max-lg:absolute max-lg:-top-20 max-lg:bg-light-third-500 max-lg:border max-lg:border-light-secondary-300 max-lg:-right-3 max-lg:border-b-0 max-lg:py-3 max-lg:px-2 max-lg:rounded-t-lg;
}
</style>
