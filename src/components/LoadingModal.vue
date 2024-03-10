<script setup lang="ts">
const props = defineProps(["title"]);
</script>

<template>
  <div
    class="fixed z-30 flex flex-col items-center justify-center gap-5 rounded shadow-md bg-light-primary-100 border-light-primary-100 px-5 py-3"
  >
    <span
      class="inline-block w-2/4 border-8 border-light-secondary-300 aspect-square rounded-full border-t-light-primary-200 animate-spin"
    ></span>
    <p class="font-bold capitalize text-slate-900">
      {{ props.title }}
    </p>
  </div>
</template>
