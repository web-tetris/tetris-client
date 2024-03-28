<script setup lang="ts">
import { toRefs, watch } from 'vue'
import { useTimeout } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import Matrix from '@/widgets/Matrix.vue'
import type { BlockMatrix } from '@/types/block-matrix'
import GradientWrapper from '@/ui/GradientWrapper.vue'
import { colors } from '@/consts/random-colors'
import type { BlockColor } from '@/consts/block-color'

const props = defineProps<{
  next: BlockMatrix
  score: number
  style: BlockColor
}>()

const { t } = useI18n()

const { score, style } = toRefs(props)

const { isPending, start } = useTimeout(500, { immediate: false, controls: true })
watch(score, start)
</script>

<template>
  <div class="score">
    <div class="title">
      {{ t('score.title') }}
    </div>

    <div class="total">
      <div>{{ t('score.total') }}</div>

      <GradientWrapper :class="{ animate: isPending }">
        <div class="value">
          <div>{{ score }}</div>
        </div>
      </GradientWrapper>

      <div class="next-panel">
        <span class="label">{{ t('score.next') }}</span>
        <div class="figure">
          <Matrix :matrix="props.next" :style="style" small />
        </div>
      </div>
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
    align-self: center;
    font-size: 20px;
    margin-bottom: 20px;
  }

  .total {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .animate {
      animation: gelatine 0.5s;
    }

    .value {
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
    }
  }

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
      border: 2px solid v-bind('colors[0]');
      border-radius: 8px;
    }
  }

  .menu {
    margin-top: auto;
  }
}
</style>
