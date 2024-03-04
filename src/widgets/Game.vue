<script setup lang="ts">
import { ref } from 'vue'
import Matrix from '@/widgets/Matrix.vue'
import Score from '@/widgets/Score.vue'
import { useGameLife } from '@/hooks/game-life'
import { useGameField } from '@/hooks/game-field'
import { useGameController } from '@/hooks/game-controller'
import NumberInput from '@/ui/NumberInput.vue'
import { useSettingsService } from '@/hooks/settings'
import Button from '@/ui/Button.vue'
import Modal from '@/ui/Modal.vue'

const { difficult, interval } = useSettingsService()
const { counter } = useGameLife({ interval })
const { matrix, nextFigure, score, move, rotate, reset } = useGameField({ counter })
useGameController({ move, rotate })

const showed = ref<boolean>(false)
</script>

<template>
  <div class="game">
    <Matrix :matrix="matrix" class="matrix" />
    <div class="info">
      <Score class="score" :next="nextFigure" :score="score" />
      <Button icon="arrow-clockwise" @click="reset">
        Reset
      </Button>
      <Button icon="list" @click="showed = true">
        Menu
      </Button>
    </div>
    <Modal v-model:showed="showed" title="Menu">
      <div class="difficult">
        <span>Difficult:</span>
        <NumberInput v-model="difficult" />
      </div>
    </Modal>
  </div>
</template>

<style scoped lang="scss">
.game {
  display: flex;
  gap: 20px;
  border: 1px solid gray;
  border-radius: 10px;
  padding: 10px;

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
  }

  .difficult {
    display: flex;
    align-items: center;
    gap: 10px;
  }
}
</style>
