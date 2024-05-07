<script setup lang="ts">
import { computed, toRefs } from 'vue'
import type { BlockMatrix } from '@/types/block-matrix'
import Block from '@/ui/Block.vue'

const props = defineProps<{
  matrix: BlockMatrix
  small?: boolean
}>()
const { matrix } = toRefs(props)

const xSize = computed(() => matrix.value[0].length)
const ySize = computed(() => matrix.value.length)
const matrixFlat = computed(() => matrix.value.flat())
</script>

<template>
  <div class="grid">
    <template
      v-for="(block, i) in matrixFlat"
      :key="i"
    >
      <Block
        :block="block"
        :small="props.small"
      />
    </template>
  </div>
</template>

<style scoped lang="scss">
.grid {
  display: grid;
  grid-template-columns: repeat(v-bind(xSize), 1fr);
  grid-template-rows: repeat(v-bind(ySize), 1fr);
  grid-gap: 2px;
}
</style>
