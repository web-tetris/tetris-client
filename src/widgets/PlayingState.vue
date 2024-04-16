<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { BlockMatrix } from '@/types/block-matrix'
import type { BlockStyle } from '@/consts/block-style'
import NextFigure from '@/widgets/NextFigure.vue'
import { MultiplayerMode } from '@/consts/multiplayer-mode'

const props = withDefaults(defineProps<{
  nextFigure: BlockMatrix
  style: BlockStyle
  multiplayerMode: MultiplayerMode
  player?: number
}>(), {
  player: 0,
})

const { t } = useI18n()
</script>

<template>
  <div class="playing-state" :class="{ 'co-op': multiplayerMode === MultiplayerMode.CO_OP }">
    <div v-if="multiplayerMode === MultiplayerMode.CO_OP" class="title">
      {{ `${t('playing-state.player')} ${player + 1}` }}
    </div>

    <NextFigure class="next-figure" :style="props.style" :next="props.nextFigure" />
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
