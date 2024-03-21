<script setup lang="ts">
import { ref, watch } from 'vue'
import { useToggle } from '@vueuse/core'
import Matrix from '@/widgets/Matrix.vue'
import Score from '@/widgets/Score.vue'
import { useGameController } from '@/hooks/game-controller'
import { useSettingsService } from '@/hooks/settings'
import Button from '@/ui/Button.vue'
import Menu from '@/widgets/Menu.vue'
import GameOver from '@/widgets/GameOver.vue'
import { ControlType } from '@/consts/control-type'
import { colors } from '@/consts/random-colors'
import ControllerSelect from '@/widgets/ControllerSelect.vue'
import { useGameField } from '@/hooks/game-field'

const { difficult } = useSettingsService()
const { matrix, nextFigure, score, gameOver, move, rotate, reset, pause, resume } = useGameField({ difficult })

const [menuShowed, toggleMenu] = useToggle(false)
watch(menuShowed, showed => showed ? pause() : resume())

const currentControl = ref<ControlType>(ControlType.ARROWS)
const currentGamepad = ref<number>(0)

useGameController({
  type: currentControl,
  move,
  rotate,
  index: currentGamepad,
  reset,
  toggleMenu,
})
</script>

<template>
  <div class="game">
    <Matrix :matrix="matrix" class="matrix" />
    <div class="info">
      <Score class="score" :next="nextFigure" :score="score" />

      <ControllerSelect v-model:control="currentControl" v-model:gamepad="currentGamepad" />

      <div class="buttons-list">
        <Button icon="arrow-clockwise" label="Reset" @click="reset" />
        <Button icon="list" label="Menu" @click="() => toggleMenu()" />
      </div>
    </div>

    <Menu v-model:showed="menuShowed" v-model:difficult="difficult" />
    <GameOver :showed="gameOver" :score="score" @restart="reset" />
  </div>
</template>

<style scoped lang="scss">
.game {
  padding: 10px;
  position: relative;
  display: flex;
  gap: 20px;
  background: white;
  border-radius: 10px;
  border: 2px solid v-bind('colors[0]');

  .matrix {
    padding: 10px;
    border: 2px solid v-bind('colors[0]');
    border-radius: 10px;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 150px;

    .score {
      flex: 1
    }

    //.controllers {
    //  display: flex;
    //  flex-direction: column;
    //  gap: 40px;
    //
    //  .connection-message {
    //    color: gray;
    //    text-align: center;
    //  }
    //}

    .buttons-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

  }
}
</style>
