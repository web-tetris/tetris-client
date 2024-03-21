<script setup lang="ts">
import { computed, toRefs } from 'vue'
import type { BlockMatrix } from '@/types/block-matrix'

const props = defineProps<{
  matrix: BlockMatrix
  small?: boolean
}>()

const xSize = computed(() => props.matrix[0].length)
const ySize = computed(() => props.matrix.length)
const matrixFlat = computed(() => props.matrix.flat())

const { small } = toRefs(props)
</script>

<template>
  <div class="grid">
    <div
      v-for="(block, i) in matrixFlat"
      :key="i" class="cell"
      :class="[small ? 'small' : '', `color-${block}`]"
    />
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

        &.color-gray {
          background: none;
          border: none;
        }
      }

      &.color {
        &-gray {
          --color: #F2F1F5FF;
          border: none;
        }

        &-coral {
          --color: #fd8484;
        }

        &-pink {
          --color: #fac17d;
        }

        &-lilac {
          --color: #f8fc8c;
        }

        &-frenchblue {
          --color: #9ffc8c;
        }

        &-pepper {
          --color: #71f2ff;
        }

        &-gold {
          --color: #9d8dfc;
        }

        &-paradise {
         --color: #fd96fd;
        }
      }
    }
}
</style>
