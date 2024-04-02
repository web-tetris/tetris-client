<script setup lang="ts">
import ControllerSelect from '@/widgets/ControllerSelect.vue'
import type { BlockMatrix } from '@/types/block-matrix'
import type { BlockStyle } from '@/consts/block-style'
import type { ControlType } from '@/consts/control-type'
import NextFigure from '@/widgets/NextFigure.vue'
import { MultiplayerMode } from '@/consts/multiplayer-mode'

const props = defineProps<{
  nextFigure: BlockMatrix
  currentStyle: BlockStyle
  multiplayerMode: MultiplayerMode
}>()

const gamepad = defineModel<number>('gamepad', { required: true })
const control = defineModel<ControlType>('control', { required: true })
</script>

<template>
  <div class="playing-state" :class="{ 'co-op': multiplayerMode === MultiplayerMode.CO_OP }">
    <NextFigure class="next-figure" :style="props.currentStyle" :next="props.nextFigure" />

    <ControllerSelect
      v-model:control="control"
      v-model:gamepad="gamepad"
      class="select"
    />
  </div>
</template>

<style scoped lang="scss">
.playing-state {
  display: flex;
  flex-direction: column;
  gap: 40px;

  .next-figure {
    flex: 1;
  }

  &.co-op {
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding: 10px;

    .next-figure {
      flex: none;
    }

    .controllers {
      width: 200px;
    }
  }
}
</style>
