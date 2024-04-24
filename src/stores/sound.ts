import { ref, watch } from 'vue'
import { useDocumentVisibility, whenever } from '@vueuse/core'
import { defineStore, storeToRefs } from 'pinia'
import type { BlockStyle } from '@/consts/block-style'
import { useSettingsStore } from '@/stores/settings'

type Sound = 'theme' | 'drop' | 'stack' | 'fail' | 'button'

export const useSoundStore = defineStore('sound-effects', () => {
  const { blockStyle } = storeToRefs(useSettingsStore())
  const volume = ref(1)

  const visibility = useDocumentVisibility()

  function getSoundUrl(style: BlockStyle, sound: Sound) {
    return new URL(`../assets/sounds/${style}/${sound}.mp3?url`, import.meta.url).href
  }

  function createSound(soundVolume: number, sound: Sound, background?: boolean) {
    const audio = new Audio()

    watch([blockStyle, volume], () => {
      audio.src = getSoundUrl(blockStyle.value, sound)
      audio.volume = volume.value * soundVolume
    }, { immediate: true })

    whenever(() => visibility.value === 'hidden', () => audio.pause())

    if (background) {
      audio.autoplay = true
      audio.loop = true
      whenever(() => visibility.value === 'visible', () => audio.play())
    }

    return () => {
      if (visibility.value === 'visible')
        void audio.play()
    }
  }

  const themeSound = createSound(0.3, 'theme', true)
  const figureDropSound = createSound(0.7, 'drop')
  const lineStackSound = createSound(1, 'stack')
  const gameOverSound = createSound(0.5, 'fail')
  const buttonSound = createSound(0.8, 'button')

  return {
    volume,

    themeSound,
    figureDropSound,
    lineStackSound,
    gameOverSound,
    buttonSound,
  }
})
