<script setup lang="ts">
import { ref, watch } from 'vue'
import { useToggle } from '@vueuse/core'
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
import { colors } from '@/consts/random-colors'
import ControllerSelect from '@/widgets/ControllerSelect.vue'
import { useGameField } from '@/hooks/game-field'

const { t } = useI18n()

const { difficult } = useSettingsService()
const { matrix, nextFigure, score, gameOver, move, rotate, reset, pause, resume } = useGameField({ difficult })

const [menuShowed, toggleMenu] = useToggle(false)
watch(menuShowed, showed => showed ? pause() : resume())

const controlsOptions = computed<SelectOption<ControlType>[]>(() =>
  [
    {
      label: t('game.arrow'),
      value: ControlType.ARROWS,
      icon: 'bi bi-arrows-move',
    },
    {
      label: t('game.gamepad'),
      value: ControlType.GAMEPAD,
      icon: 'bi bi-controller',
    },
    {
      label: 'WASD',
      value: ControlType.WASD,
      icon: 'bi bi-alphabet-uppercase',
    },
  ])
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

      <ControllerSelect v-model:control="currentControl" v-model:gamepad="currentGamepad" />

      <template v-if="currentControl === ControlType.GAMEPAD">
        <Select
          v-if="gamepads.length"
          v-model="currentGamepad"
          label="Gamepads"
          :options="gamepadOptions"
        />
        <div v-else class="connection-message">
          {{ t("game.connection") }}
        </div>
      </template>

      <Select v-model="currentControl" :label="t('game.game-controls')" :options="controlsOptions" />
      <Button icon="list" :label="t('game.menu')" @click="toggleMenu" />
      <Button icon="arrow-clockwise" :label="t('game.reset')" @click="reset" />

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

    .buttons-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }
}

</style>
