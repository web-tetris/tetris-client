<script setup lang="ts">
import { computed } from 'vue'
import Matrix from '@/components/Matrix.vue'
import Score from '@/components/Score.vue'
import { useGameLife } from '@/hooks/game-life'
import { useGameField } from '@/hooks/game-field'
import { useGameController } from '@/hooks/game-controller'
import { useSettingsService } from '@/utils/settings-servise'

const { counter } = useGameLife()
const { matrix, nextFigure, score, move, rotate, reset } = useGameField({ counter })

useGameController({ move, rotate })

const { difficult } = useSettingsService()
const disabled = computed(() => difficult.value === 1)
</script>

<template>
  <div class="game">
    <Matrix :matrix="matrix" class="matrix" />
    <div class="info">
      <Score class="score" :next="nextFigure" :score="score" />
      <button class="reset" :onclick="reset">
        Reset
      </button>
      <div class="difficult">
        <span>Difficult:</span>
        <button class="btn" :onclick="() => difficult -= 1" :disabled="disabled">
          -
        </button>
        <input v-model="difficult" class="input">
        <button class="btn" :onclick="() => difficult += 1">
          +
        </button>
      </div>
    </div>
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

  .info{
    display: flex;
    flex-direction: column;
    gap: 20px;

    .score {
      flex: 1
    }

    .reset {
      border: 1px solid gray;
      border-radius: 8px;
    }

    .difficult {
      display: flex;
      gap: 5px;

      .btn {
        width: 30px;
        border: 1px solid gray;
        border-radius: 8px;
        text-align: center;
      }

      .input {
        width: 40px;
        border: 1px solid gray;
        border-radius: 8px;
        text-align: center;
      }
    }
  }
}
</style>
