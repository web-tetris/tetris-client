<script setup lang="ts">
import { ref, watch } from 'vue'
import { whenever } from '@vueuse/core'
import Matrix from '@/widgets/Matrix.vue'
import Score from '@/widgets/Score.vue'
import { useGameLife } from '@/hooks/game-life'
import { useGameField } from '@/hooks/game-field'
import { useGameController } from '@/hooks/game-controller'
import { useSettingsService } from '@/hooks/settings'
import Button from '@/ui/Button.vue'
import Menu from '@/widgets/Menu.vue'
import GameOver from '@/widgets/GameOver.vue'

const { interval, difficult } = useSettingsService()
const { counter, pause, resume } = useGameLife({ interval })
const { matrix, nextFigure, score, gameOver, move, rotate, reset } = useGameField({ counter, difficult })
useGameController({ move, rotate })

const menuShowed = ref<boolean>(false)
watch(menuShowed, showed => showed ? pause() : resume())

const gameOverShowed = ref<boolean>(false)
whenever(gameOver, () => gameOverShowed.value = true)
watch(gameOverShowed, (gameOverShowed) => {
  if (gameOverShowed)
    pause()
})

const restarted = ref<boolean>(false)
watch(restarted, (restarted) => {
  if (restarted) {
    reset()
    gameOverShowed.value = false
    restarted = false
  }
})
</script>

<template>
  <div class="game">
    <Matrix :matrix="matrix" class="matrix" />
    <div class="info">
      <Score class="score" :next="nextFigure" :score="score" />
      <Button icon="arrow-clockwise" label="Reset" @click="reset" />
      <Button icon="list" label="Menu" @click="menuShowed = true" />
    </div>
    <Menu v-model:showed="menuShowed" v-model:difficult="difficult" />
    <GameOver v-model:showed="gameOverShowed" v-model:restarted="restarted" />
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

}
</style>
