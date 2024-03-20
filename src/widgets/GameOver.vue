<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Modal from '@/ui/Modal.vue'
import Button from '@/ui/Button.vue'

const props = defineProps<{
  showed: boolean
  score: number
}>()

const emits = defineEmits<{
  'restart': []
}>()

const { t } = useI18n()
</script>

<template>
  <Modal :showed="props.showed" :closable="false" :title="t('game-over.title')" relative>
    <div>{{ t("game-over.score", { value: score }) }}</div>
    <div>{{ t("game-over.new-game") }}</div>
    <Button class="btn" :label="t('game-over.retry')" icon="arrow-clockwise" @click="emits('restart')" />
  </Modal>
</template>

<style scoped lang="scss">
.btn {
  width: 150px;
  margin: 0 10px 0 auto;
}
</style>
