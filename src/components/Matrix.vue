<script setup lang="ts">
import { computed } from 'vue'
import type { BlockMatrix } from '@/types/block-matrix'

const props = defineProps<{
  matrix: BlockMatrix
  small?: boolean
}>()

const xSize = computed(() => props.matrix[0].length)
const ySize = computed(() => props.matrix.length)
const matrixFlat = computed(() => props.matrix.flat())
</script>

<template>
  <div class="grid">
    <div
      v-for="(block, i) in matrixFlat" :key="i" class="cell" :class="[`color-${block}`, small ? 'small' : '']"
    />
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/mixins';

  .grid {
    display: grid;
    grid-template-columns: repeat(v-bind(xSize), 1fr);
    grid-template-rows: repeat(v-bind(ySize), 1fr);
    grid-gap: 1px;

    .cell {
      border-radius: 2px;
      @include mixins.size(30px);

      &.small {
        @include mixins.size(15px);
      }

      &.color {
        &-coral {
          background: #FF6F61;
        }
        &-gray {
          background: rgba(155, 183, 212, 0.3);
        }
        &-turmeric {
          background: #FE840E;
        }
        &-pink {
          background: #C62168;
        }
        &-frenchblue {
          background: #0072B5;
        }
        &-pepper {
          background: #8D9440;
        }
        &-gold {
          background: #FFD662;
        }
        &-lilac {
          background: #E8B5CE;
        }
        &-paradise {
          background: #95DEE3;
        }
      }
    }
}
</style>
