<script setup lang="ts">
import { ref, toRefs, watch } from 'vue'
import { useToggle } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import Matrix from '@/widgets/Matrix.vue'
import { useGameField } from '@/hooks/game-field'
import { useGameController } from '@/hooks/game-controller'
import { useSettingsService } from '@/hooks/settings'
import Button from '@/ui/Button.vue'
import Menu from '@/widgets/Menu.vue'
import GameOver from '@/widgets/GameOver.vue'
import { ControlType } from '@/consts/control-type'
import StyleSelect from '@/widgets/StyleSelect.vue'
import { BlockStyle } from '@/consts/block-style'
import PlayingState from '@/widgets/PlayingState.vue'
import { MultiplayerMode } from '@/consts/multiplayer-mode'
import { colors } from '@/consts/random-colors'
import GameScore from '@/widgets/GameScore.vue'

const props = defineProps<{
  multiplayerMode: MultiplayerMode
  players: number
}>()

const emits = defineEmits<{
  'addScore': [number]
}>()

const { multiplayerMode, players } = toRefs(props)

const { t } = useI18n()

const { difficult } = useSettingsService()
function add(score: number) {
  emits('addScore', score)
}
const { matrix, nextFigure, score, gameOver, move, rotate, reset, pause, resume } = useGameField({ difficult, add })

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

const currentStyle = ref<BlockStyle>(BlockStyle.MAIN)
</script>

<template>
  <div class="game">
    <div class="versus">
      <Matrix :matrix="matrix" class="matrix" :style="currentStyle" />

      <div class="info">
        <GameScore :score="score" class="score" />

        <PlayingState
          v-if="multiplayerMode === MultiplayerMode.VERSUS"
          v-model:gamepad="currentGamepad"
          v-model:control="currentControl"
          :current-style="currentStyle"
          :next-figure="nextFigure"
          :multiplayer-mode="multiplayerMode"
        />

        <StyleSelect v-model:style="currentStyle" class="style" />

        <div class="buttons-list">
          <Button
            icon="arrow-clockwise" :label="t('game.reset')"
            @click="reset"
          />
          <Button
            icon="list" :label="t('game.menu')"
            @click="() => toggleMenu()"
          />
        </div>
      </div>

      <Menu v-model:showed="menuShowed" v-model:difficult="difficult" />
      <GameOver :showed="gameOver" :score="score" @restart="reset" />
    </div>

    <div v-if="multiplayerMode === MultiplayerMode.CO_OP" class="co-op">
      <PlayingState
        v-for="i in players"
        :key="i"
        v-model:gamepad="currentGamepad"
        v-model:control="currentControl"
        :current-style="currentStyle"
        :next-figure="nextFigure"
        :multiplayer-mode="multiplayerMode"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../styles/constants';

.game {
  display: flex;
  flex-direction: column;
  gap: 50px;

  .versus {
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
      gap: 25px;
      width: 150px;

      .style {
        margin-top: auto;
      }

      .buttons-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
    }
  }

  .co-op {
  }
}
</style>
