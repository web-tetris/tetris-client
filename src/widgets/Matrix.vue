<script setup lang="ts">
import { computed, shallowRef, toRefs } from 'vue'
import { useElementSize } from '@vueuse/core'
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

const gridRef = shallowRef<HTMLElement>()
const { height } = useElementSize(gridRef)
const blockSize = computed(() => `${height.value / (ySize.value + 2)}px`)
</script>

<template>
  <div ref="gridRef" class="grid">
    <template
      v-for="(block, i) in matrixFlat"
      :key="i"
    >
      <Block
        :block="block"
        :small="props.small"
        :block-size="blockSize"
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
