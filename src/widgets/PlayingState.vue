<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import ControllerSelect from '@/widgets/ControllerSelect.vue'
import type { BlockMatrix } from '@/types/block-matrix'
import type { BlockStyle } from '@/consts/block-style'
import { ControlType } from '@/consts/control-type'
import NextFigure from '@/widgets/NextFigure.vue'
import { MultiplayerMode } from '@/consts/multiplayer-mode'
import type { MoveDirection } from '@/consts/move-direction'
import { useGameController } from '@/hooks/game-controller'

const props = withDefaults(defineProps<{
  nextFigure: BlockMatrix
  style: BlockStyle
  multiplayerMode: MultiplayerMode
  player?: number
}>(), {
  player: 0,
})

const emits = defineEmits<{
  move: [MoveDirection]
  rotate: []
  reset: []
  menu: []
}>()

const currentControl = ref<ControlType>(ControlType.ARROWS)
const currentGamepad = ref<number>(0)

useGameController({
  type: currentControl,
  index: currentGamepad,
  move: direction => emits('move', direction),
  rotate: () => emits('rotate'),
  reset: () => emits('reset'),
  toggleMenu: () => emits('menu'),
})

const { t } = useI18n()
</script>

<template>
  <div class="playing-state" :class="{ 'co-op': multiplayerMode === MultiplayerMode.CO_OP }">
    <div v-if="multiplayerMode === MultiplayerMode.CO_OP" class="title">
      {{ `${t('playing-state.player')} ${player + 1}` }}
    </div>

    <NextFigure class="next-figure" :style="props.style" :next="props.nextFigure" />

    <ControllerSelect
      v-model:control="currentControl"
      v-model:gamepad="currentGamepad"
      class="select"
    />
  </div>
</template>

<style scoped lang="scss">
.playing-state {
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-bottom: auto;
  width: 100%;

  .next-figure {
    flex: 1;
  }

  .select {
    margin-top: 20px;
    width: 150px;
  }

  &.co-op {
    gap: 10px;

    .title {
      font-size: 20px;
    }
  }
}
</style>
