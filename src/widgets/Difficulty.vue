<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import NumberInput from '@/ui/NumberInput.vue'

const difficult = defineModel('difficult', { required: true })

const { t } = useI18n()
</script>

<template>
  <div class="difficult">
    <span>{{ t('menu.difficult') }}</span>
    <NumberInput v-model:modelValue="difficult" />
  </div>
</template>

<style scoped lang="scss">
  .difficult {
    display: flex;
    align-items: center;
    gap: 10px;
  }
</style>
