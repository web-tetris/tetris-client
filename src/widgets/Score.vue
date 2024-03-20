<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Matrix from '@/widgets/Matrix.vue'
import type { BlockMatrix } from '@/types/block-matrix'

const props = defineProps<{
  next: BlockMatrix
  score: number
}>()

const { t } = useI18n()
</script>

<template>
  <div class="score">
    <div class="title">
      {{ t('score.title') }}
    </div>
    <div class="total">
      <div>{{ t('score.total', { score }) }}</div>
    </div>

    <div class="next-panel">
      <span class="label">{{ t('score.next') }}</span>
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

  .title {
    text-align: center;
    font-size: 20px;
  }

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
