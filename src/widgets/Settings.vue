<script setup lang="ts">
import { useVModels } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import Modal from '@/ui/Modal.vue'
import LanguageSelect from '@/widgets/LanguageSelect.vue'

const props = defineProps<{
  showed: boolean
}>()

const emits = defineEmits<{
  'update:showed': [boolean]
}>()

const { t } = useI18n()

const { showed } = useVModels(props, emits)
</script>

<template>
  <Modal v-model:showed="showed" :closable="true" :title="t('settings.title')" relative>
    <LanguageSelect />
  </Modal>
</template>

<style scoped lang="scss">

</style>
