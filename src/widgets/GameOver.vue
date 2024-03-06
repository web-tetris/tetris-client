<script setup lang="ts">
import Modal from '@/ui/Modal.vue'
import Button from '@/ui/Button.vue'

const props = defineProps<{
  showed: boolean
}>()

const emits = defineEmits<{
  'restart': []
}>()
</script>

<template>
  <Modal :showed="props.showed" :closable="false" title="Game over">
    <div>Do you want to play again?</div>
    <Button class="btn" label="Try again" icon="arrow-clockwise" @click="emits('restart')" />
  </Modal>
</template>

<style scoped lang="scss">
.btn {
  width: 150px;
  margin: 0 10px 0 auto;
}
</style>
