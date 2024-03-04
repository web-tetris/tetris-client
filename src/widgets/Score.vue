<script setup lang="ts">
import Matrix from '@/widgets/Matrix.vue'
import type { BlockMatrix } from '@/types/block-matrix'

const props = defineProps<{
  next: BlockMatrix
  score: number
}>()
</script>

<template>
  <div class="score">
    <div>Score</div>
    <div class="total">
      <div>Total: {{ score }}</div>
    </div>

    <div class="next-panel">
      <span class="label">Next figure:</span>
      <Matrix :matrix="props.next" small class="figure" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.score {
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .next-panel {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .figure {
      margin: 0 auto;
    }
  }

  .menu {
    margin-top: auto;
  }
}
</style>
