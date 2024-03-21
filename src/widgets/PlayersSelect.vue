<script setup lang="ts">
import { useVModels } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import Select from '@/ui/Select.vue'
import type { SelectOption } from '@/types/select-option'

const props = defineProps<{
  players: number
}>()

const emits = defineEmits<{
  'update:players': [number]
}>()

const { t } = useI18n()

const { players } = useVModels(props, emits)

const options = computed <SelectOption []>(() => Array.from({ length: 3 }, (_, i) => ({
  value: i + 1,
  label: t('players-select.player', { count: i + 1 }),
})))
</script>

<template>
  <Select v-model="players" class="players" :options="options" :label="t('players-select.title')" />
</template>

<style scoped lang="scss">
.players {
  width: 300px;
}
</style>
