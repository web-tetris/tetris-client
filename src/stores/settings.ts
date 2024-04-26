import { defineStore } from 'pinia'
import { ref } from 'vue'
import { MultiplayerMode } from '@/consts/multiplayer-mode'
import { BlockStyle } from '@/consts/block-style'
import { ControlType } from '@/consts/control-type'

export const useSettingsStore = defineStore('settings', () => {
  const players = ref(1)
  const multiplayerMode = ref(MultiplayerMode.VERSUS)
  const blockStyle = ref(BlockStyle.MAIN)
  const difficulty = ref(1)
  const controlType = ref(ControlType.ARROWS)
  const gamepadIndex = ref(0)

  return {
    players,
    multiplayerMode,
    blockStyle,
    difficulty,
    controlType,
    gamepadIndex,

  }
})
