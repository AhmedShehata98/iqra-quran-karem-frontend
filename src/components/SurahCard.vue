<template>
  <tr class="surah-row">
    <td>
      <code>{{ prefixSurahNumber(props.surah.id) }}</code>
      <span class="playing-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6"
        >
          <path
            fill-rule="evenodd"
            d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
    </td>
    <td>
      <b>{{ props.surah.name }}</b>
    </td>
    <td>
      <p>{{ props.surah.mekkia === 1 ? "مكية" : "مدنية" }}</p>
    </td>
    <td>
      <p>{{ duration }}</p>
    </td>
    <td>
      <p>{{ moshafType }}</p>
    </td>
  </tr>
</template>
<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  surah: Surah;
  surahUrl: string;
  moshafType: string;
}>();

//state
//
const duration = ref("00:00");

// methods
//
function prefixSurahNumber(surahNumber: number) {
  return surahNumber.toString().padStart(3, "0");
}
</script>
<style scoped lang="css">
.surah-row {
  position: relative;
  overflow: hidden;
  transition: background-color 0.5s ease-in-out;
}
.surah-row.is-matching {
  transform: scale(1.02);
  font-weight: 800;
  @apply shadow-2xl !bg-light-secondary-400;
}
.surah-row .playing-icon {
  width: 2rem;
  height: 2rem;
  display: none;
  align-items: center;
  justify-content: center;
  @apply text-light-third-500;
}
.surah-row .active > .playing-icon {
  display: flex;
}
.surah-row .active > code {
  display: none;
}
.surah-row::after {
  content: "";
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 0.4rem;
  transition: opacity 0.5s ease-in-out;
  opacity: 0;
  @apply bg-light-third-400;
}
.surah-row .active::after {
  opacity: 1;
}
.surah-row code {
  font-weight: 600;
  padding-inline: 0.75rem;
}
.surah-row p {
  padding-block: 1rem;
}

.surah-row:nth-child(odd) {
  @apply bg-light-secondary-200;
}
.surah-row:nth-child(even) {
  @apply bg-light-secondary-100;
}
</style>
