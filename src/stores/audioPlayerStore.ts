import { defineStore } from "pinia";
import { ref, reactive, onMounted, onUnmounted } from "vue";
import { prefixSurahNumber } from "@/utils/helpers";

interface SelectedMediaType extends Surah {
  url: string;
}
export const useAudioPlayerStore = defineStore("audio-player-store", () => {
  let audioMetaInterval = 0;
  const audio = reactive(new Audio());
  const moshaf = ref<Moshaf | null>(null);
  const selectedMediaDetails = ref<SelectedMediaType | null>(null);
  const isLastMediaElem = ref<boolean>(false);
  const isFirstMediaElem = ref<boolean>(false);
  const volume = ref<number>(0.64);
  const durationTime = ref<number>(0);
  const currentTime = ref<number>(0);
  const isPaused = ref<boolean>(false);
  const isShownPlayer = ref<boolean>(false);
  const isShuffled = ref<boolean>(false);

  const setToggleShowPlayer = (value: boolean) => {
    isShownPlayer.value = value;
  };

  const setMoshaf = (data: Moshaf) => (moshaf.value = data);
  const setVolume = (vol: number) => (volume.value = vol);
  const selectCurrentMedia = (media: SelectedMediaType) =>
    (selectedMediaDetails.value = media);

  const setShuffleMedia = () => (isShuffled.value = !isShuffled.value);
  const playMedia = async () => {
    try {
      await audio.play();
    } catch (error: any) {
      throw new Error(`something went wrong: ${error.message}`);
    }
  };
  const pauseMedia = async () => {
    try {
      await audio.pause();
    } catch (error: any) {
      throw new Error(`something went wrong: ${error.message}`);
    }
  };
  const setIsLastMediaElement = () => {
    if (selectedMediaDetails.value === null) {
      console.error("No media element selected");
      return false;
    }
    if (moshaf.value?.suwar === undefined)
      throw new Error("there is no suwar available");
    if (selectedMediaDetails.value.id >= moshaf.value?.suwar.length) {
      return true;
    } else {
      return false;
    }
  };
  const setIsFirstMediaElement = () => {
    if (selectedMediaDetails.value === null) {
      console.error("No media element selected");
      return false;
    }
    if (selectedMediaDetails.value.id <= 1) {
      return true;
    } else {
      return false;
    }
  };
  const handleGetPlayData = async ({
    volume = 0.65,
    mediaId,
    cb,
  }: {
    volume?: number;
    mediaId: number;
    cb: (isSuccess: boolean) => void;
  }) => {
    try {
      const media = moshaf.value?.suwar.find((surah) => surah.id === mediaId);
      if (media === undefined)
        throw new Error(`Media ${mediaId} not found in suwar`);
      const url = `${moshaf.value?.server}${prefixSurahNumber(media.id)}.mp3`;
      selectCurrentMedia({
        ...media,
        url,
      });
      audio.src = url;
      audio.volume = volume;
      audio.preload = "metadata";
      isFirstMediaElem.value = setIsFirstMediaElement();
      isLastMediaElem.value = setIsLastMediaElement();
      setVolume(volume);
      if (cb) return cb(true);
    } catch (error: any) {
      if (cb) return cb(false);
      throw new Error(`something went wrong: ${error.message}`);
    }
  };
  const play = ({ mediaId, volume }: { volume?: number; mediaId: number }) => {
    handleGetPlayData({
      mediaId,
      volume,
      cb: async (isSuccess) =>
        isSuccess
          ? await playMedia()
          : console.error("ERROR , could not get play this media"),
    });
    setToggleShowPlayer(true);
  };
  const handlePauseMedia = async () => {
    try {
      if (!isPaused.value) return await pauseMedia();
    } catch (error: any) {
      throw new Error(`something went wrong: ${error.message}`);
    }
  };
  const handleMuteVolume = () => {
    audio.volume = 0;
    volume.value = 0;
  };
  const handleChangeVolume = (val: number) => {
    audio.volume = val;
    volume.value = val;
  };
  const handleUpdateCurrentTime = (time: number) => {
    currentTime.value = time;
    audio.currentTime = time;
  };
  const handleLoadedMetaData = (ev: Event) => {
    const target = ev.target as HTMLAudioElement;
    audioMetaInterval = +setInterval(() => {
      currentTime.value = target.currentTime;
      durationTime.value = target.duration;
    }, 900);
    isPaused.value = target.paused;
  };
  const setNextMedia = () => {
    if (selectedMediaDetails.value === null)
      throw new Error("No media selected");
    if (moshaf.value === null) throw new Error("No moshaf data available");
    const nextMediaId = (selectedMediaDetails.value.id += 1);

    handleGetPlayData({
      volume: 0.65,
      mediaId: nextMediaId,
      cb: async (isSuccess) => (isSuccess ? await playMedia() : null),
    });
    setToggleShowPlayer(true);
  };
  const setPrevMedia = async () => {
    if (selectedMediaDetails.value === null)
      throw new Error("No media selected");
    if (moshaf.value === null) throw new Error("No moshaf data available");
    const nextMediaId = (selectedMediaDetails.value.id -= 1);

    handleGetPlayData({
      volume: 0.65,
      mediaId: nextMediaId,
      cb: async (isSuccess) => (isSuccess ? await playMedia() : null),
    });
    setToggleShowPlayer(true);
  };
  const setNextShuffledMedia = () => {
    const nextMediaId = Math.round(Math.random() * 114);

    handleGetPlayData({
      volume: 0.65,
      mediaId: nextMediaId,
      cb: async (isSuccess) => (isSuccess ? await playMedia() : null),
    });
    setToggleShowPlayer(true);
  };
  const playListenerMethod = () => {
    isPaused.value = false;
  };
  const pauseListenerMethod = () => {
    isPaused.value = true;
    clearInterval(audioMetaInterval);
  };
  const endedListenerMethod = () => {
    if (isShuffled.value) {
      setNextShuffledMedia();
    } else {
      setNextMedia();
    }
  };

  onMounted(() => {
    audio.addEventListener("playing", playListenerMethod);
    audio.addEventListener("pause", pauseListenerMethod);
    audio.addEventListener("loadedmetadata", handleLoadedMetaData);
    audio.addEventListener("ended", endedListenerMethod);
  });

  onUnmounted(() => {
    audio.removeEventListener("loadedmetadata", handleLoadedMetaData);
    audio.removeEventListener("playing", playListenerMethod);
    audio.removeEventListener("pause", pauseListenerMethod);
    audio.removeEventListener("ended", endedListenerMethod);
  });

  return {
    selectedMediaDetails,
    isLastMediaElem,
    isFirstMediaElem,
    volume,
    durationTime,
    currentTime,
    isPaused,
    isShownPlayer,
    isShuffled,
    setShuffleMedia,
    setVolume,
    setToggleShowPlayer,
    setMoshaf,
    next: setNextMedia,
    nextShuffled: setNextShuffledMedia,
    prev: setPrevMedia,
    resume: playMedia,
    play,
    pause: pauseMedia,
    mute: handleMuteVolume,
    handleChangeVolume,
    handleUpdateCurrentTime,
  };
});
