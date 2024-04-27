<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { BlockMatrix } from '@/types/block-matrix'
import Matrix from '@/widgets/Matrix.vue'

const props = defineProps<{
  next: BlockMatrix
}>()

const { t } = useI18n()
</script>

<template>
  <div class="next-panel">
    <span class="label">{{ t('score.next') }}</span>
    <div class="figure">
      <Matrix :matrix="props.next" small />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../styles/constants';

.next-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .figure {
    margin: 0 auto;
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid constants.$color-primary-0;
    border-radius: 8px;
  }
}
</style>
