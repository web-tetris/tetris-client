<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed, toRefs, watch } from 'vue'
import Matrix from '@/widgets/Matrix.vue'
import PlayingState from '@/widgets/PlayingState.vue'
import { MultiplayerMode } from '@/consts/multiplayer-mode'
import GameScore from '@/widgets/GameScore.vue'
import Button from '@/ui/Button.vue'
import GameOver from '@/widgets/GameOver.vue'
import { useGame } from '@/hooks/game'
import { useGameController } from '@/hooks/game-controller'

const props = defineProps<{
  multiplayerMode: MultiplayerMode
  players: number
  difficult: number
}>()

const emits = defineEmits<{
  add: [number]
}>()

const paused = defineModel('paused', { required: true })
const currentStyle = defineModel('currentStyle', { required: true })

const { t } = useI18n()

const { difficult } = toRefs(props)
const figureAmount = computed(() => props.multiplayerMode === MultiplayerMode.CO_OP ? props.players : 1)
const { matrix, nextFigures, score, gameOver, reset, pause, resume } = useGame({ difficult, figureAmount, add: score => emits('add', score) })
watch(paused, paused => paused ? pause() : resume())

useGameController({

})
</script>

<template>
  <div class="game">
    <Matrix
      :matrix="matrix"
      class="matrix"
      :style="currentStyle"
    />

    <div class="info">
      <GameScore
        :score="score"
        class="score"
        :class="{ small: props.multiplayerMode === MultiplayerMode.CO_OP }"
      />

      <div class="co-op">
        <PlayingState
          v-for="(player, i) in figureAmount"
          :key="player"
          :style="currentStyle"
          :next-figure="nextFigures[i].value"
          :multiplayer-mode="props.multiplayerMode"
          :player="i"
        />
      </div>

      <Button
        icon="arrow-clockwise" :label="t('game.reset')"
        @click="reset"
      />
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
