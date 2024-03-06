<script setup lang="ts">
import { useVModels } from '@vueuse/core'
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

const { showed, difficult } = useVModels(props, emits)
</script>

<template>
  <Modal v-model:showed="showed" :closable="true" title="Menu">
    <div class="difficult">
      <span>Difficult:</span>
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
