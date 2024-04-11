<script setup lang="ts">
import { computed, ref, toRefs, watch } from 'vue'
import { useToggle } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import Matrix from '@/widgets/Matrix.vue'
import { useGameField } from '@/hooks/game-field'
import { useSettingsService } from '@/hooks/settings'
import Button from '@/ui/Button.vue'
import Menu from '@/widgets/Menu.vue'
import GameOver from '@/widgets/GameOver.vue'
import StyleSelect from '@/widgets/StyleSelect.vue'
import { BlockStyle } from '@/consts/block-style'
import PlayingState from '@/widgets/PlayingState.vue'
import { MultiplayerMode } from '@/consts/multiplayer-mode'
import GameScore from '@/widgets/GameScore.vue'
import { colors } from '@/consts/random-colors'
import { useHighscores } from '@/hooks/highscores'

const props = defineProps<{
  multiplayerMode: MultiplayerMode
  players: number
}>()

const { multiplayerMode, players } = toRefs(props)

const { add } = useHighscores()

const { t } = useI18n()

const { difficult } = useSettingsService()

const figureAmount = computed(() => multiplayerMode.value === MultiplayerMode.CO_OP ? players.value : 1)
const { matrix, nextFigures, score, gameOver, move, rotate, reset, pause, resume } = useGameField({ difficult, figureAmount, add })

const [menuShowed, toggleMenu] = useToggle(false)
watch(menuShowed, showed => showed ? pause() : resume())

const currentStyle = ref<BlockStyle>(BlockStyle.MAIN)
</script>

<template>
  <div class="game">
    <Matrix :matrix="matrix" class="matrix" :style="currentStyle" />

    <div class="info">
      <GameScore :score="score" class="score" :class="{ small: multiplayerMode === MultiplayerMode.CO_OP }" />

      <div class="co-op">
        <PlayingState
          v-for="(player, i) in figureAmount"
          :key="player"
          :style="currentStyle"
          :next-figure="nextFigures[i].value"
          :multiplayer-mode="multiplayerMode"
          :player="i"
          @move="move(i, $event)"
          @rotate="rotate(i)"
          @reset="reset"
          @menu="toggleMenu"
        />
      </div>

      <StyleSelect
        v-model:style="currentStyle"
        class="style"
        :class="{ 'co-op': multiplayerMode === MultiplayerMode.CO_OP }"
      />

      <div class="buttons-list" :class="{ 'co-op': multiplayerMode === MultiplayerMode.CO_OP }">
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
  border: 2px solid v-bind('colors[0]');

  .matrix {
    padding: 10px;
    border: 2px solid v-bind('colors[0]');
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

    .style {
      margin-top: auto;

      &.co-op {
        width: 200px;
        margin-left: auto;
      }
    }

    .buttons-list {
      display: flex;
      flex-direction: column;
      gap: 10px;

      &.co-op {
        width: 200px;
        margin-left: auto;
      }
    }
  }

  .co-op {
    display: flex;
    gap: 20px;
  }
}
</style>
