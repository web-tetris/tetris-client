<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed, shallowRef, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { breakpointsTailwind, useBreakpoints, useToggle } from '@vueuse/core'
import Matrix from '@/widgets/Matrix.vue'
import PlayingState from '@/widgets/PlayingState.vue'
import { MultiplayerMode } from '@/consts/multiplayer-mode'
import GameScore from '@/widgets/GameScore.vue'
import Button from '@/ui/Button.vue'
import GameOver from '@/widgets/GameOver.vue'
import { useGame } from '@/hooks/game'
import { useSettingsStore } from '@/stores/settings'

const { t } = useI18n()

const { multiplayerMode, players } = storeToRefs(useSettingsStore())
const figureAmount = computed(() => multiplayerMode.value === MultiplayerMode.CO_OP ? players.value : 1)

const { matrix, nextFigures, score, gameOver, reset, pause, resume, move, rotate } = useGame({ figureAmount })

const [paused, togglePaused] = useToggle(false)
watch(paused, paused => paused ? pause() : resume())

const { isGreater } = useBreakpoints(breakpointsTailwind)

const matrixRef = shallowRef<HTMLElement>()
</script>

<template>
  <div class="game">
    <Matrix
      ref="matrixRef"
      :matrix="matrix"
      class="matrix"
      @touchstart.prevent.stop
    />

    <div class="info">
      <GameScore
        :score="score"
        class="score"
        :class="{ small: multiplayerMode === MultiplayerMode.CO_OP }"
      />

      <div class="next-figure">
        <PlayingState
          v-for="(player, i) in figureAmount"
          :key="player"
          :next-figure="nextFigures[i]"
          :player="i"
          :matrix="matrixRef"
          @move="move(i, $event)"
          @rotate="rotate(i)"
          @reset="reset"
        />
      </div>

      <div class="buttons">
        <Button
          :icon="paused ? 'play' : 'pause'"
          @click="() => togglePaused()"
        />
        <Button
          icon="arrow-clockwise"
          :label="isGreater('sm') ? t('game.reset') : ''"
          @click="reset"
        />
      </div>
    </div>

    <GameOver
      :showed="gameOver"
      :score="score"
      @restart="reset"
    />
  </div>
</template>

<style scoped lang="scss">
@use '../styles/constants';

.game {
  display: flex;
  gap: 20px;
  padding: 10px;
  position: relative;
  background: white;
  border-radius: 10px;
  border: 2px solid constants.$color-primary-0;

  .matrix {
    padding: 10px;
    border: 2px solid constants.$color-primary-0;
    border-radius: 10px;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 30px;
    min-width: 150px;

    .score.small {
      width: 200px;
      margin: 0 auto;
    }
  }

  .buttons {
    display: flex;
    gap: 10px;
    margin: auto 0 0 auto;
  }

  @media (max-width: constants.$breakpoint-sm) {
    flex-direction: column;
    gap: 10px;

    .info {
      flex-direction: row;
      gap: 20px;

      .score {
        flex: 1;
        height: 100%;
      }
    }

    .next-figure {
      flex: 1;
    }

    .buttons {
      flex-direction: column;
    }
  }
}
</style>
