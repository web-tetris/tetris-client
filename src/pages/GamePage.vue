<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useEventListener, useToggle, whenever } from '@vueuse/core'
import { MultiplayerMode } from '@/consts/multiplayer-mode'
import Highscore from '@/widgets/Highscore.vue'
import Game from '@/widgets/Game.vue'
import Button from '@/ui/Button.vue'
import { useSettingsStore } from '@/stores/settings'
import { useSoundStore } from '@/stores/sound'
import { useHighscoresStore } from '@/stores/highscores'

const settingsStore = useSettingsStore()
const { players, multiplayerMode } = storeToRefs(settingsStore)

const { themeSound } = useSoundStore()
const stop = useEventListener(['keydown', 'mousedown'], () => {
  themeSound()
  stop()
})

whenever(() => players.value === 1, () => multiplayerMode.value = MultiplayerMode.VERSUS)

const { highscores, currentScore } = storeToRefs(useHighscoresStore())

const [settingsShowed, toggleSettings] = useToggle(false)
</script>

<template>
  <div class="game-page">
    <Highscore class="highscore" :highscores="highscores" :current-score="currentScore" />

    <div class="body">
      <div class="game-list">
        <template v-if="multiplayerMode === MultiplayerMode.VERSUS">
          <Game
            v-for="i in players"
            :key="i"
            class="game"
            @menu="toggleSettings"
          />
        </template>

        <template v-else>
          <Game
            class="game"
            @menu="toggleSettings"
          />
        </template>
      </div>
    </div>

    <Button link="/" large class="settings-button" icon="sliders" />
  </div>
</template>

<style scoped lang="scss">
.game-page {
  padding: 30px 20px;
  display: flex;
  gap: 10px;

  .highscore {
    width: 150px;
    margin: auto;
  }

  .body {
    flex: 1;
    display: flex;
    flex-direction: column;

    .game-list {
      display: flex;
      justify-content: space-around;
    }
  }

  .settings-button {
    margin-top: auto;
  }
}
</style>
