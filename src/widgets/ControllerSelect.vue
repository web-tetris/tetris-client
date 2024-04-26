<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { ControlType } from '@/consts/control-type'
import { useGamepad } from '@/hooks/gamepad'
import type { SelectOption } from '@/types/select-option'
import Select from '@/ui/Select.vue'
import { useSettingsStore } from '@/stores/settings'

const props = defineProps<{
  player: number
}>()

const { controlType, gamepadIndex } = storeToRefs(useSettingsStore())

const { t } = useI18n()

const controlsOptions = computed <SelectOption <ControlType>[]>(() => [
  {
    label: t('controller-select.arrow'),
    value: ControlType.ARROWS,
    icon: 'bi bi-arrows-move',
  },
  {
    label: t('controller-select.gamepad'),
    value: ControlType.GAMEPAD,
    icon: 'bi bi-controller',
  },
  {
    label: t('controller-select.wasd'),
    value: ControlType.WASD,
    icon: 'bi bi-alphabet-uppercase',
  },
])

const { gamepads } = useGamepad()
const gamepadOptions = computed<SelectOption[]>(() =>
  gamepads.value.map((gp, index) => ({
    label: `Gamepad ${index + 1}`,
    value: index,
    icon: 'bi bi-controller',
  })),
)
</script>

<template>
  <div class="controllers">
    <Select
      v-model="controlType"
      :label="`${t('controller-select.game-controls')}`"
      :second-label="`${t('controller-select.player')} ${player}`"
      :options="controlsOptions"
    />

    <template v-if="controlType === ControlType.GAMEPAD">
      <Select
        v-if="gamepads.length"
        v-model="gamepadIndex"
        label="Gamepads"
        :options="gamepadOptions"
      />
      <div v-else class="connection-message">
        {{ t('controller-select.connection') }}
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.controllers {
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 10px;

  .connection-message {
    color: gray;
    text-align: center;
  }
}
</style>
