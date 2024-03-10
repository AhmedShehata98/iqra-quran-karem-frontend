import { defineStore } from "pinia";
import { ref } from "vue";

export const useMoshafState = defineStore("moshaf-state", () => {
  const moshafType = ref<Moshaf>();

  const setMoshafType = (moshaf: Moshaf) => {
    moshafType.value = moshaf;
  };
  return { moshafType, setMoshafType };
});
