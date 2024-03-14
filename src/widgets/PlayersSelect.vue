<script setup lang="ts">
import { useVModels } from '@vueuse/core'
import Select from '@/ui/Select.vue'
import type { SelectOption } from '@/types/select-option'

const props = defineProps<{
  players: number
}>()

const emits = defineEmits<{
  'update:players': [number]
}>()

const { players } = useVModels(props, emits)

const options: SelectOption[] = Array.from({ length: 3 }, (_, i) => ({
  value: i + 1,
  label: `${i + 1} player${i > 0 ? 's' : ''}`,
}))
</script>

<template>
  <Select v-model="players" class="players" :options="options" label="Number of players" />
</template>

<style scoped lang="scss">
.players {
  width: 300px;
}
</style>
