<script setup lang="ts">
import { useVModels } from '@vueuse/core'
import Modal from '@/ui/Modal.vue'
import Button from '@/ui/Button.vue'

const props = defineProps<{
  showed: boolean
  restarted: boolean
}>()

const emits = defineEmits<{
  'update:showed': [boolean]
  'update:restarted': [boolean]
}>()

const { showed, restarted } = useVModels(props, emits)
</script>

<template>
  <Modal v-model:showed="showed" title="Game over">
    <div>Do you want to play again?</div>
    <Button class="btn" label="Yes" icon="arrow-clockwise" @click="restarted = true" />
    <Button class="btn" label="No" icon="x-lg" @click="showed = false" />
  </Modal>
</template>

<style scoped lang="scss">
.btn {
  width: 100px;
  margin: 0 10px 0 auto;
}
</style>
