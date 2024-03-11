<script setup lang="ts">
import { useSideMenuState } from '@/stores/sideMenuState'

const sideMenuState = useSideMenuState()
</script>
<template>
  <v-navigation-drawer
    v-model="sideMenuState.isShown"
    color="teal-lighten-2"
    tag="aside"
    location="right"
  >
    <template v-slot:prepend>
      <div class="d-flex items-center justify-center ga-4 my-4">
        <v-icon size="xxx-large">mdi-book-open-page-variant</v-icon>
        <h2 style="line-height: 3.5rem">اقرأ</h2>
      </div>
    </template>
    <v-divider></v-divider>
    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-account-group"
        title="القراء"
        value="/reciter"
        href="/reciter"
        link
      ></v-list-item>
      <!-- <v-list-item
        prepend-icon="mdi-radio"
        title="اذاعة الراديو"
        value="radio"
        href="/radio"
        link
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-head-snowflake"
        title="التفسير"
        value="tafsier"
        href="/tafsier"
        link
      ></v-list-item> -->
    </v-list>
  </v-navigation-drawer>
</template>
<style scoped>
.router-link-active,
.router-link-exact-active {
  @apply bg-light-secondary-500 shadow-xl;
}
</style>
