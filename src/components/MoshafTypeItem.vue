<template>
  <li class="moshat-type-item"><slot></slot></li>
</template>
<script setup lang="ts"></script>
<style>
.moshat-type-item {
  @apply flex gap-4 px-6 py-3 cursor-pointer shrink-0 bg-light-primary-300 drop-shadow font-bold rounded-md;
}
.moshat-type-item.active {
  @apply !bg-light-secondary-300 text-slate-800 pointer-events-none;
}
</style>
