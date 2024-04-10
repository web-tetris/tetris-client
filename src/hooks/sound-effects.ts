import { useSound } from '@vueuse/sound'
import { computed, ref } from 'vue'
import { createGlobalState, useDocumentVisibility, whenever } from '@vueuse/core'
import TetrisTheme from '@/assets/sounds/tetris-theme.mp3'
import FigureDrop from '@/assets/sounds/figure-drop.mp3'
import LineStack from '@/assets/sounds/line-stack.mp3'
import GameOverTrack from '@/assets/sounds/game-over.mp3'
import InterfaceButton from '@/assets/sounds/interface-button.mp3'

export const useSoundEffects = createGlobalState(() => {
  const volume = ref(1)

  const visibility = useDocumentVisibility()
  function createSound(soundVolume: number, url: string, background?: boolean) {
    const { play, pause } = useSound(
      url,
      { volume: computed(() => volume.value * soundVolume) },
    )

    whenever(() => visibility.value === 'hidden', () => pause())

    if (background)
      whenever(() => visibility.value === 'visible', () => play())

    return () => visibility.value === 'visible' && play()
  }

  const themeSound = createSound(0.3, TetrisTheme, true)
  const figureDropSound = createSound(0.7, FigureDrop)
  const lineStackSound = createSound(1, LineStack)
  const gameOverSound = createSound(0.5, GameOverTrack)
  const buttonSound = createSound(0.8, InterfaceButton)

  return {
    volume,

    themeSound,
    figureDropSound,
    lineStackSound,
    gameOverSound,
    buttonSound,
  }
})
