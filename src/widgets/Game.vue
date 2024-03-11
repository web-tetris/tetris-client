<script setup lang="ts">
import { ref, watch } from 'vue'
import Matrix from '@/widgets/Matrix.vue'
import Score from '@/widgets/Score.vue'
import { useGameField } from '@/hooks/game-field'
import { useGameController } from '@/hooks/game-controller'
import { useSettingsService } from '@/hooks/settings'
import Button from '@/ui/Button.vue'
import Menu from '@/widgets/Menu.vue'
import GameOver from '@/widgets/GameOver.vue'
import Select from '@/ui/Select.vue'
import type { SelectOption } from '@/types/select-option'
import { ControlType } from '@/consts/control-type'

const { difficult } = useSettingsService()
const { matrix, nextFigure, score, gameOver, move, rotate, reset, gameLife } = useGameField({ difficult })

const menuShowed = ref<boolean>(false)

const options: SelectOption<ControlType>[] = [
  {
    label: 'Arrows',
    value: ControlType.ARROWS,
    icon: 'bi bi-arrows-move',
  },
  {
    label: 'Gamepad',
    value: ControlType.GAMEPAD,
    icon: 'bi bi-controller',
  },
  {
    label: 'WASD',
    value: ControlType.WASD,
    icon: 'bi bi-alphabet-uppercase',
  },
]

const currentControl = ref<ControlType>(ControlType.ARROWS)

useGameController({ type: currentControl, move, rotate })

watch(menuShowed, showed => showed ? gameLife.pause() : gameLife.resume())
</script>

<template>
  <div class="game">
    <Matrix :matrix="matrix" class="matrix" />
    <div class="info">
      <Score class="score" :next="nextFigure" :score="score" />
      <Select v-model="currentControl" label="Game controls" :options="options" />
      <Button icon="arrow-clockwise" label="Reset" @click="reset" />
      <Button icon="list" label="Menu" @click="menuShowed = true" />
    </div>
    <Menu v-model:showed="menuShowed" v-model:difficult="difficult" />
    <GameOver :showed="gameOver" :score="score" @restart="reset" />
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
    width: 150px;

    .score {
      flex: 1
    }
  }

}
</style>
