<script setup lang="ts">
import { useVModels } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import Modal from '@/ui/Modal.vue'
import NumberInput from '@/ui/NumberInput.vue'

const props = defineProps<{
  showed: boolean
  difficult: number
}>()

const emits = defineEmits<{
  'update:showed': [boolean]
  'update:difficult': [number]
}>()

const { t } = useI18n()

const { showed, difficult } = useVModels(props, emits)
</script>

<template>
  <Modal v-model:showed="showed" :closable="true" :title="t('menu.title')" relative>
    <div class="difficult">
      <span>{{ t('menu.difficult') }}</span>
      <NumberInput v-model:modelValue="difficult" />
    </div>
  </Modal>
</template>

<style scoped lang="scss">
  .difficult {
    display: flex;
    align-items: center;
    gap: 10px;
  }
</style>
