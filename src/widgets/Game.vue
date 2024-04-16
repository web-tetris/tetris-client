<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Matrix from '@/widgets/Matrix.vue'
import PlayingState from '@/widgets/PlayingState.vue'
import { MultiplayerMode } from '@/consts/multiplayer-mode'
import GameScore from '@/widgets/GameScore.vue'
import type { BlockMatrix } from '@/types/block-matrix'
import Button from '@/ui/Button.vue'
import GameOver from '@/widgets/GameOver.vue'

const props = defineProps<{
  matrix: BlockMatrix
  nextFigures: BlockMatrix
  multiplayerMode: MultiplayerMode
  players: number
  figureAmount: number
  score: number
  gameOver: boolean
}>()

const emits = defineEmits<{
  reset: []
}>()

const currentStyle = defineModel('currentStyle', { required: true })
const { t } = useI18n()
</script>

<template>
  <div class="game">
    <Matrix
      :matrix="props.matrix"
      class="matrix"
      :style="currentStyle"
    />

    <div class="info">
      <GameScore
        :score="props.score"
        class="score"
        :class="{ small: props.multiplayerMode === MultiplayerMode.CO_OP }"
      />

      <div class="co-op">
        <PlayingState
          v-for="(player, i) in props.figureAmount"
          :key="player"
          :style="currentStyle"
          :next-figure="props.nextFigures"
          :multiplayer-mode="props.multiplayerMode"
          :player="i"
        />
      </div>

      <Button
        icon="arrow-clockwise" :label="t('game.reset')"
        @click="() => emits('reset')"
      />
    </div>

    <GameOver
      :showed="props.gameOver"
      :score="props.score"
      @restart="() => emits('reset')"
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
  border: 2px solid var(--primary-0);

  .matrix {
    padding: 10px;
    border: 2px solid var(--primary-0);
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

  .co-op {
    display: flex;
    gap: 20px;
  }
}
</style>
