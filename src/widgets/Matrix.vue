<script setup lang="ts">
import { computed, toRefs } from 'vue'
import type { BlockMatrix } from '@/types/block-matrix'
import { BlockColor } from '@/consts/block-color'

const props = defineProps<{
  matrix: BlockMatrix
  small?: boolean
  style: BlockColor
}>()

const xSize = computed(() => props.matrix[0].length)
const ySize = computed(() => props.matrix.length)
const matrixFlat = computed(() => props.matrix.flat())

const { small, style } = toRefs(props)

function getImageUrl(block: string, style: BlockColor) {
  return new URL(`../assets/blocks/${style}/${block}.png?url`, import.meta.url).href
}
</script>

<template>
  <div v-if="style === 'main'" class="grid">
    <div
      v-for="(block, i) in matrixFlat"
      :key="i" class="cell"
      :class="[`color-${block}`, { small }]"
    />
  </div>

  <div v-else class="grid">
    <div
      v-for="(block, i) in matrixFlat"
      :key="i" class="cell color-empty"
      :class="[{ small }]"
    >
      <div v-if="block === BlockColor.EMPTY" />
      <img v-else alt="cell" class="cell image" :class="{ small }" :src="getImageUrl(block, style)">
    </div>
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
      --color: white;
      @include mixins.size(30px);
      border-radius: 2px;
      background: var(--color);
      border: 3px solid rgba(black, 0.1);

      &.small {
        @include mixins.size(15px);
        border-width: 1px;

        &.color-empty {
          background: none;
          border: none;
        }
      }

      .image {
        border: none;
        background-color: #F2F1F5FF;
      }

      &.color {
        &-empty {
          --color: #F2F1F5FF;
          border: none;
        }

        &-block-1 {
          --color: #fd8484;
        }

        &-block-2 {
          --color: #fac17d;
        }

        &-block-3 {
          --color: #f8fc8c;
        }

        &-block-4 {
          --color: #9ffc8c;
        }

        &-block-5 {
          --color: #71f2ff;
        }

        &-block-6 {
          --color: #9d8dfc;
        }

        &-block-7 {
         --color: #fd96fd;
        }
      }
    }
}
</style>
