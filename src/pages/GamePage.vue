<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useEventListener, whenever } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { MultiplayerMode } from '@/consts/multiplayer-mode'
import Highscore from '@/widgets/Highscore.vue'
import Game from '@/widgets/Game.vue'
import Button from '@/ui/Button.vue'
import { useSettingsStore } from '@/stores/settings'
import { useSoundStore } from '@/stores/sound'
import { useHighscoresStore } from '@/stores/highscores'

const settingsStore = useSettingsStore()
const { players, multiplayerMode } = storeToRefs(settingsStore)

const { t } = useI18n()

const { themeSound } = useSoundStore()
const stop = useEventListener(['keydown', 'mousedown'], () => {
  themeSound()
  stop()
})

whenever(() => players.value === 1, () => multiplayerMode.value = MultiplayerMode.VERSUS)

const { highscores, currentScore } = storeToRefs(useHighscoresStore())

const gameIcon = new URL('../assets/new-game.png?url', import.meta.url).href
</script>

<template>
  <div class="page">
    <div class="header">
      <div class="logo-small">
        Tetris
      </div>
      <Button
        reverse
        icon="box-arrow-right"
        link="/" large class="settings-button" :label="t('game.new')"
        :src="gameIcon"
      />
    </div>

    <div class="game-page">
      <Highscore
        class="highscore" :highscores="highscores"
        :current-score="currentScore"
      />

      <div class="game-list">
        <div class="fields">
          <template v-if="multiplayerMode === MultiplayerMode.VERSUS">
            <Game v-for="i in players" :key="i" class="game" />
          </template>

          <template v-else>
            <Game class="game" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;

  .header {
    display: flex;
    justify-content: space-between;
    padding: 0 50px;

    .settings-button {
      width: 150px;
      align-self: center;
    }
  }

  .game-page {
    display: flex;
    align-items: center;

    .highscore {
      display: flex;
      flex-direction: column;
      gap: 50px;
      width: 150px;
    }

    .game-list {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 50px;

        .fields {
          display: flex;
          justify-content: space-around;
        }
    }
  }

}
</style>
