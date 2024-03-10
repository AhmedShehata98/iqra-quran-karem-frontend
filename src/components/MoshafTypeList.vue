<template>
  <ul class="moshaf-type-list">
    <slot></slot>
  </ul>
</template>
<script setup lang="ts"></script>
<style>
.moshaf-type-list {
  @apply w-full flex items-center justify-start gap-4 mb-6 py-4;
}
</style>
