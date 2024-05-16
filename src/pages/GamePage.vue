<script setup lang="ts">
import { storeToRefs } from 'pinia'
import {
  breakpointsTailwind, onClickOutside,
  useBreakpoints,
  useEventListener, useToggle,
  whenever,
} from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { shallowRef } from 'vue'
import { MultiplayerMode } from '@/consts/multiplayer-mode'
import Highscore from '@/widgets/Highscore.vue'
import Game from '@/widgets/Game.vue'
import Button from '@/ui/Button.vue'
import { useSettingsStore } from '@/stores/settings'
import { useSoundStore } from '@/stores/sound'
import { useHighscoresStore } from '@/stores/highscores'
import GradientBackground from '@/ui/GradientBackground.vue'

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

const { isGreater, isSmaller } = useBreakpoints(breakpointsTailwind)

const [showed, toggleShowed] = useToggle(false)

const target = shallowRef()
onClickOutside(target, () => showed.value = false)
</script>

<template>
  <GradientBackground clear>
    <div class="page">
      <div class="header">
        <div class="logo-small">
          Tetris
        </div>

        <div class="buttons">
          <Button
            v-if="isSmaller('sm')"
            class="settings-button"
            icon="star"
            @click="() => toggleShowed()"
          />

          <Button
            reverse
            :large="isGreater('sm') && 'large'"
            :label="isGreater('sm') ? t('game.new') : ''"
            :src="gameIcon"
            icon="box-arrow-right"
            link="/"
            class="settings-button"
          />
        </div>
      </div>

      <div ref="target" class="game-page">
        <Highscore
          v-if="isGreater('sm') || showed"
          class="highscore"
          :highscores="highscores"
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
  </GradientBackground>
</template>

<style scoped lang="scss">
@use '../styles/constants';

.page {
  flex: 1;
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
    flex: 1;
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
      height: 80%;

        .fields {
          flex: 1;
          display: flex;
          justify-content: space-around;
        }
    }
  }

  @media (max-width: constants.$breakpoint-sm) {
    padding: 5px;

    .header {
      padding: 0 10px;

      .logo-small {
        font-size: 40px;
      }

      .buttons {
        display: flex;
        gap: 10px;

        .settings-button {
          width: 40px;
        }
      }
    }

    .game-page {
      position: relative;

      .highscore {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
        width: 300px;
        background: white;
        box-shadow: rgba(0, 0, 0, 0.1) 0 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
      }

      .game-list {
        height: 100%;

        .fields {

          .game {
            flex: 1;
          }
        }
      }
    }
  }
}
</style>
