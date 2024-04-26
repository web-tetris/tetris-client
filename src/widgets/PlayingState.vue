<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import type { BlockMatrix } from '@/types/block-matrix'
import NextFigure from '@/widgets/NextFigure.vue'
import { MultiplayerMode } from '@/consts/multiplayer-mode'
import { useGameController } from '@/hooks/game-controller'
import type { MoveDirection } from '@/consts/move-direction'
import { useSettingsStore } from '@/stores/settings'

const props = withDefaults(defineProps<{
  nextFigure: BlockMatrix
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

const { multiplayerMode, controlType, gamepadIndex } = storeToRefs(useSettingsStore())

const { t } = useI18n()

useGameController({
  type: controlType,
  index: gamepadIndex,
  move: direction => emits('move', direction),
  rotate: () => emits('rotate'),
  reset: () => emits('reset'),
  toggleMenu: () => emits('menu'),
})
</script>

<template>
  <div class="playing-state" :class="{ 'co-op': multiplayerMode === MultiplayerMode.CO_OP }">
    <div v-if="multiplayerMode === MultiplayerMode.CO_OP" class="title">
      {{ `${t('playing-state.player')} ${player + 1}` }}
    </div>

    <NextFigure class="next-figure" :next="props.nextFigure" />
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

  &.co-op {
    gap: 10px;

    .title {
      font-size: 20px;
    }
  }
}
</style>
