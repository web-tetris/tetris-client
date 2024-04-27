<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import Select from '@/ui/Select.vue'
import type { SelectOption } from '@/types/select-option'
import { MultiplayerMode } from '@/consts/multiplayer-mode'
import { useSettingsStore } from '@/stores/settings'

const { multiplayerMode, players } = storeToRefs(useSettingsStore())

const { t } = useI18n()

const playersOptions = computed <SelectOption []>(() => Array.from({ length: 3 }, (_, i) => ({
  value: i + 1,
  label: t('players-select.player', { count: i + 1 }),
})))

const fieldOptions = computed <SelectOption <MultiplayerMode>[]>(() => [
  { value: MultiplayerMode.VERSUS, label: t('players-select.versus') },
  { value: MultiplayerMode.CO_OP, label: t('players-select.co-op') },
])
</script>

<template>
  <div class="selectors">
    <Select
      v-model="players"
      class="players"
      :options="playersOptions"
      :label="t('players-select.title')"
    />
    <Select
      v-if="players > 1"
      v-model="multiplayerMode"
      class="fields"
      :options="fieldOptions"
      :label="t('players-select.field-title')"
    />
  </div>
</template>

<style scoped lang="scss">
.selectors{
  display: flex;
  flex-direction: column;
  gap: 50px;
}
</style>
