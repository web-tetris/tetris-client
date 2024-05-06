<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { storeToRefs } from 'pinia'
import type { BlockMatrix } from '@/types/block-matrix'
import { BlockStyle } from '@/consts/block-style'
import { BlockColor } from '@/consts/block-color'
import { useSettingsStore } from '@/stores/settings'
import MainBlocks from '@/ui/MainBlocks.vue'

const props = defineProps<{
  matrix: BlockMatrix
  small?: boolean
}>()
const { matrix, small } = toRefs(props)

const { blockStyle } = storeToRefs(useSettingsStore())

const xSize = computed(() => matrix.value[0].length)
const ySize = computed(() => matrix.value.length)
const matrixFlat = computed(() => matrix.value.flat())

function getImageUrl(block: string, style: BlockStyle) {
  return new URL(`../assets/blocks/${style}/${block}.png?url`, import.meta.url).href
}
</script>

<template>
  <div class="grid">
    <template
      v-for="(block, i) in matrixFlat"
      :key="i"
    >
      <MainBlocks v-if="block === BlockColor.EMPTY || blockStyle === BlockStyle.MAIN" :block="block" class="cell" :class="{ small }" />
      <img v-else alt="cell" class="cell image" :class="{ small }" :src="getImageUrl(block, blockStyle)">
    </template>
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/mixins';

  .grid {
    display: grid;
    grid-template-columns: repeat(v-bind(xSize), 1fr);
    grid-template-rows: repeat(v-bind(ySize), 1fr);
    grid-gap: 2px;

    .cell {
      @include mixins.size(30px);

      &.small {
        @include mixins.size(15px);
        border-width: 1px;

        &.color-empty {
          background: none;
          border: none;
        }
      }

      &.image {
        border: none;
        background-color: #F2F1F5FF;

        &.small {
          background-color: white;
        }
      }
    }
}
</style>
