<script setup lang="ts">
import { computed, ref, watch } from 'vue'
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
import { useGamepad } from '@/hooks/gamepad'
import { colors } from '@/consts/random-colors'

const { difficult } = useSettingsService()
const { matrix, nextFigure, score, gameOver, move, rotate, reset, gameLife } = useGameField({ difficult })

const menuShowed = ref<boolean>(false)
function toggleMenu() {
  menuShowed.value = !menuShowed.value
}
watch(menuShowed, showed => showed ? gameLife.pause() : gameLife.resume())

const controlsOptions: SelectOption<ControlType>[] = [
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

const { gamepads } = useGamepad()
const gamepadOptions = computed<SelectOption[]>(() =>
  gamepads.value.map((gp, index) => ({
    label: `Gamepad ${index + 1}`,
    value: index,
    icon: 'bi bi-controller',
  })),
)
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

      <div class="controllers">
        <template v-if="currentControl === ControlType.GAMEPAD">
          <Select
            v-if="gamepads.length"
            v-model="currentGamepad"
            label="Gamepads"
            :options="gamepadOptions"
          />
          <div v-else class="connection-message">
            Connect one or more gamepads
          </div>
        </template>
        <Select
          v-model="currentControl"
          label="Game controls"
          :options="controlsOptions"
        />
      </div>

      <div class="buttons-list">
        <Button icon="arrow-clockwise" label="Reset" @click="reset" />
        <Button icon="list" label="Menu" @click="toggleMenu" />
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

    .controllers {
      display: flex;
      flex-direction: column;
      gap: 40px;

      .connection-message {
        color: gray;
        text-align: center;
      }
    }

    .buttons-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

  }
}
</style>
