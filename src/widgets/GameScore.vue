<script setup lang="ts">
import { toRefs, watch } from 'vue'
import { useTimeout } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import GradientWrapper from '@/ui/GradientWrapper.vue'

const props = defineProps<{
  score: number
}>()

const { t } = useI18n()

const { score } = toRefs(props)

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
    </div>
  </div>
</template>

<style scoped lang="scss">
.score {
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
      width: 100%;
      margin: 0 auto;

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

    .menu {
      margin-top: auto;
    }
}
</style>
