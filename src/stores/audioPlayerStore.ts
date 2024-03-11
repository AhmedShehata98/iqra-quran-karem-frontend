import { prefixSurahNumber } from '@/utils/helpers'
import { defineStore } from 'pinia'
import { ref, reactive, watch, onUnmounted } from 'vue'

export const useAudioPlayerStore = defineStore('audio-player-store', () => {
  let audioMetaInterval = 0
  const audio = reactive(new Audio())
  const mediaList = reactive<Array<Surah>>([])
  const selectedMediaDetails = ref<Surah | null>(null)
  const selectedMediaCursor = ref<number | null>(null)
  const isLastMediaElem = ref<boolean>(false)
  const isFirstMediaElem = ref<boolean>(false)
  const serverURL = ref<string | null>(null)
  const volume = ref<number>(0.64)
  const durationTime = ref<number>(0)
  const currentTime = ref<number>(0)
  const isPaused = ref<boolean>(false)
  const isShownPlayer = ref<boolean>(false)
  const isShuffled = ref<boolean>(false)

  const setToggleShowPlayer = (value: boolean) => {
    isShownPlayer.value = value
  }

  const setServerURL = (url: string) => (serverURL.value = url)
  const setMediaList = (media: Surah[]) => mediaList.push(...media)
  const setVolume = (vol: number) => (volume.value = vol)
  const setShuffleMedia = () => (isShuffled.value = !isShuffled.value)
  const playMedia = async () => {
    try {
      await audio.play()
    } catch (error: any) {
      throw new Error(`something went wrong: ${error.message}`)
    }
  }
  const pauseMedia = async () => {
    try {
      await audio.pause()
    } catch (error: any) {
      throw new Error(`something went wrong: ${error.message}`)
    }
  }
  const setIsLastMediaElement = () => {
    if (selectedMediaCursor.value === null) {
      console.error('No media element selected')
      return false
    }
    if (selectedMediaCursor.value >= mediaList.length - 1) {
      return true
    } else {
      return false
    }
  }
  const setIsFirstMediaElement = () => {
    if (selectedMediaCursor.value === null) {
      console.error('No media element selected')
      return false
    }
    if (selectedMediaCursor.value <= 0) {
      return true
    } else {
      return false
    }
  }
  const setMediaTarget = (mediaId: number) => {
    const media = mediaList.find((media) => media.id === mediaId)
    if (media === undefined)
      throw new Error(`There's no media with id: ${mediaId} .`)
    selectedMediaDetails.value = media
    return media
  }
  const setCurrentMediaCursor = (mediaId: number) => {
    const mediaIdx = mediaList.findIndex((media) => media.id === mediaId)
    if (mediaIdx === -1)
      throw new Error(`There's no media with id: ${mediaId} .`)
    selectedMediaCursor.value = mediaIdx
    return mediaIdx
  }

  const setInitialStateData = ({
    serverURL,
    mediaList,
  }: {
    mediaList: Surah[]
    serverURL: string
  }) => {
    setServerURL(serverURL)
    setMediaList(mediaList)
  }

  const handleGetPlayData = async ({
    volume = 0.65,
    mediaId,
    url,
    cb,
  }: {
    volume?: number
    mediaId: number
    url?: string
    cb: (isSuccess: boolean) => void
  }) => {
    try {
      const media = setMediaTarget(mediaId)
      setCurrentMediaCursor(mediaId)
      if (!url) {
        audio.src = `${serverURL.value}${prefixSurahNumber(media.id)}.mp3`
      } else {
        audio.src = `${url}${prefixSurahNumber(media.id)}.mp3`
      }
      audio.preload = 'metadata'
      audio.volume = volume
      setVolume(volume)
      isFirstMediaElem.value = setIsFirstMediaElement()
      isLastMediaElem.value = setIsLastMediaElement()
      setToggleShowPlayer(true)
      if (cb) return cb(true)
    } catch (error: any) {
      if (cb) return cb(false)
      throw new Error(`something went wrong: ${error.message}`)
    }
  }
  const handlePauseMedia = async () => {
    try {
      if (!isPaused.value) return await pauseMedia()
    } catch (error: any) {
      throw new Error(`something went wrong: ${error.message}`)
    }
  }
  const handleMuteVolume = () => {
    audio.volume = 0
    volume.value = 0
  }
  const handleChangeVolume = (val: number) => {
    audio.volume = val
    volume.value = val
  }
  const handleUpdateCurrentTime = (time: number) => {
    currentTime.value = time
    audio.currentTime = time
  }
  const handleLoadedMetaData = (ev: Event) => {
    const target = ev.target as HTMLAudioElement
    audioMetaInterval = +setInterval(() => {
      currentTime.value = target.currentTime
      durationTime.value = target.duration
    }, 900)
    isPaused.value = target.paused
  }
  const setNextMedia = () => {
    if (!selectedMediaCursor.value)
      throw new Error('media index is not available or undefined')
    const cursor = ++selectedMediaCursor.value
    selectedMediaCursor.value = cursor
    selectedMediaDetails.value = mediaList[cursor]
    playMedia()
  }
  const setPrevMedia = async () => {
    if (!selectedMediaCursor.value)
      throw new Error('media index is not available or undefined')
    const cursor = --selectedMediaCursor.value
    selectedMediaCursor.value = cursor
    selectedMediaDetails.value = mediaList[cursor]
    playMedia()
  }
  const playShuffledMedia = () => {
    const cursor = Math.round(Math.random() * 114)
    selectedMediaDetails.value = mediaList[cursor]
    selectedMediaCursor.value = cursor
    playMedia()
  }
  const playListenerMethod = () => {
    isPaused.value = false
  }
  const pauseListenerMethod = () => {
    isPaused.value = true
  }
  const endedListenerMethod = () => {
    if (isShuffled.value) {
      playShuffledMedia()
    } else {
      setNextMedia()
    }
  }
  watch(
    () => [serverURL.value, selectedMediaCursor.value],
    () => {
      if (serverURL.value !== null && selectedMediaCursor.value !== null) {
        audio.addEventListener('loadedmetadata', handleLoadedMetaData)
      }
    },
  )
  watch(
    () => [serverURL.value, selectedMediaCursor],
    () => {
      audio.addEventListener('playing', playListenerMethod)
    },
  )
  watch(
    () => [serverURL.value, selectedMediaCursor],
    () => {
      audio.addEventListener('pause', pauseListenerMethod)
      clearInterval(audioMetaInterval)
    },
  )
  watch(
    () => [serverURL.value, selectedMediaCursor],
    () => {
      audio.addEventListener('ended', endedListenerMethod)
    },
  )

  onUnmounted(() => {
    removeEventListener('loadedmetadata', handleLoadedMetaData)
    removeEventListener('playing', playListenerMethod)
    removeEventListener('pause', pauseListenerMethod)
    removeEventListener('ended', endedListenerMethod)
  })

  return {
    mediaList,
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
    playShuffledMedia,
    setVolume,
    setToggleShowPlayer,
    setInitialStateData,
    setNextMedia,
    setPrevMedia,
    handleGetPlayData,
    playMedia,
    pauseMedia,
    handlePauseMedia,
    handleMuteVolume,
    handleChangeVolume,
    handleUpdateCurrentTime,
  }
})
