<script setup lang="ts">
import { useVModels } from '@vueuse/core'
import Modal from '@/ui/Modal.vue'
import NumberInput from '@/ui/NumberInput.vue'
import { useSettingsService } from '@/hooks/settings'

const props = defineProps<{
  showed: boolean
}>()

const emits = defineEmits<{
  'update:showed': [boolean]
}>()

const { showed } = useVModels(props, emits)

const { difficult } = useSettingsService()
</script>

<template>
  <Modal v-model:showed="showed" title="Menu">
    <div class="difficult">
      <span>Difficult:</span>
      <NumberInput v-model="difficult" />
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
