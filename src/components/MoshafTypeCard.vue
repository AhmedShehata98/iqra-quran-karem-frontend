<template>
  <li class="moshaf-item" @click="(ev) => emits('onSelect', ev, moshaf)">
    <p>{{ props.moshaf.name }}</p>
  </li>
</template>
<script setup lang="ts">
const props = defineProps<{ moshaf: Moshaf }>();
const emits = defineEmits(["onSelect"]);
</script>
<style scoped lang="css">
.moshaf-item {
  display: flex;
  padding-inline: 1rem;
  padding-block: 0.5rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  flex-shrink: 0;
  @apply bg-light-primary-300 text-slate-900 shadow-md;
}
.moshaf-item.is-active {
  @apply bg-light-third-500 text-light-secondary-200 border border-light-secondary-400;
}
</style>
