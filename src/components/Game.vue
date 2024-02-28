<script setup lang="ts">
import Matrix from '@/components/Matrix.vue'
import Score from '@/components/Score.vue'
import { useGameLife } from '@/hooks/game-life'
import { useGameField } from '@/hooks/game-field'
import { useGameController } from '@/hooks/game-controller'

const { counter } = useGameLife()
const { matrix, nextFigure, score, move, rotate, reset } = useGameField({ counter })

useGameController({ move, rotate })
</script>

<template>
  <div class="game">
    <Matrix :matrix="matrix" class="matrix" />
    <Score class="score" :next="nextFigure" :score="score" />
    <button :onclick="reset">
      Reset
    </button>
  </div>
</template>

<style scoped lang="scss">
.game {
  display: flex;
  gap: 20px;

  .matrix {
    padding: 10px;
    border: 1px solid gray;
    border-radius: 10px;
  }

  .score {
    flex: 1
  }
}
</style>
