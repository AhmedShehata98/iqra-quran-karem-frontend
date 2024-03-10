import { defineStore } from "pinia";
import { reactive, ref, toRaw } from "vue";

export const useReciterState = defineStore("reciter-state", function () {
  let selectedReciter = ref<Reciter>(
    sessionStorage.getItem("reciterTarget") === null
      ? undefined
      : JSON.parse(sessionStorage.getItem("reciterTarget") as string)
  );

  const favoriteReciters = ref<Reciter[]>(
    localStorage.getItem("favoriteReciters") === null
      ? []
      : JSON.parse(localStorage.getItem("favoriteReciters") as string)
  );

  const setReciter = (data: Reciter) => {
    sessionStorage.setItem("reciterTarget", JSON.stringify(data));
    selectedReciter.value = data;
  };

  const removeFavoriteReciter = (reciterId: string) => {
    const newReciters = favoriteReciters.value.filter(
      (reciter) => reciter.id !== reciterId
    );
    favoriteReciters.value = newReciters;
    localStorage.setItem("favoriteReciters", JSON.stringify(newReciters));
  };

  const setFavoriteReciter = (data: Reciter) => {
    favoriteReciters.value.push(data);
    localStorage.setItem(
      "favoriteReciters",
      JSON.stringify(toRaw(favoriteReciters.value))
    );
  };
  const isFavoriteReciter = (reciterId: string) =>
    Boolean(
      favoriteReciters.value.find((reciter) => reciter?.id === reciterId)
    );

  return {
    selectedReciter,
    favoriteReciters,
    setReciter,
    setFavoriteReciter,
    removeFavoriteReciter,
    isFavoriteReciter,
  };
});
