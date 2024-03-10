import { defineStore } from "pinia";
import { ref } from "vue";
export const useSideMenuState = defineStore("side-menu-state", function () {
  const isShown = ref(true);
  function setToggle() {
    isShown.value = !isShown.value;
  }
  return { isShown, setToggle };
});
