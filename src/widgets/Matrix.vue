<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { storeToRefs } from 'pinia'
import type { BlockMatrix } from '@/types/block-matrix'
import { BlockStyle } from '@/consts/block-style'
import { BlockColor } from '@/consts/block-color'
import { useSettingsStore } from '@/stores/settings'

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
      <div v-if="block === BlockColor.EMPTY || blockStyle === BlockStyle.MAIN" class="cell" :class="[`color-${block}`, { small }]" />
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
