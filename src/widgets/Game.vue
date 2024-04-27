<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useToggle } from '@vueuse/core'
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
</script>

<template>
  <div class="game">
    <Matrix
      :matrix="matrix"
      class="matrix"
    />

    <div class="info">
      <GameScore
        :score="score"
        class="score"
        :class="{ small: multiplayerMode === MultiplayerMode.CO_OP }"
      />

      <div class="co-op">
        <PlayingState
          v-for="(player, i) in figureAmount"
          :key="player"
          :next-figure="nextFigures[i]"
          :player="i"
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
          :label="t('game.reset')"
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
}
</style>
