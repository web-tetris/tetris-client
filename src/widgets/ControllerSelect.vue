<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import {
  breakpointsTailwind,
  useBreakpoints,
  usePointer,
  whenever,
} from '@vueuse/core'
import { ControlType } from '@/consts/control-type'
import { useGamepad } from '@/hooks/gamepad'
import type { SelectOption } from '@/types/select-option'
import Select from '@/ui/Select.vue'
import { useSettingsStore } from '@/stores/settings'

const props = defineProps<{
  player: number
}>()

const { player } = toRefs(props)

const { controlType, gamepadIndex } = storeToRefs(useSettingsStore())

const { t } = useI18n()

const { isGreater } = useBreakpoints(breakpointsTailwind)
const { pointerType } = usePointer()

whenever(
  () => pointerType.value === 'touch',
  () => controlType.value = ControlType.GESTURES,
  { once: true },
)

const controlsOptions = computed <SelectOption <ControlType>[]>(() => [
  ...(pointerType.value === 'touch'
    ? [
        {
          label: t('controller-select.gestures'),
          value: ControlType.GESTURES,
          icon: 'bi bi-hand-index-thumb',
        }]
    : []),
  ...(isGreater('sm')
    ? [
        {
          label: t('controller-select.arrow'),
          value: ControlType.ARROWS,
          icon: 'bi bi-arrows-move',
        },
        {
          label: t('controller-select.wasd'),
          value: ControlType.WASD,
          icon: 'bi bi-alphabet-uppercase',
        },
      ]
    : []),
  {
    label: t('controller-select.gamepad'),
    value: ControlType.GAMEPAD,
    icon: 'bi bi-controller',
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
  <div class="controllers" :class="{ small: controlType === ControlType.GAMEPAD }">
    <Select
      v-model="controlType"
      :label="isGreater('sm') ? `${t('controller-select.player')} ${player}` : ''"
      :options="controlsOptions"
      class="select"
    />

    <div v-if="controlType === ControlType.GAMEPAD" class="select">
      <Select
        v-if="gamepads.length"
        v-model="gamepadIndex"
        label="Gamepads"
        :options="gamepadOptions"
      />
      <div v-else class="connection-message">
        {{ t('controller-select.connection') }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../styles/constants';

.controllers {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  &.small {
    display: flex;

    .select {
      flex: 1;
    }
  }

  .connection-message {
    color: gray;
    text-align: center;
    width: 150px;
  }

  @media (max-width: constants.$breakpoint-sm) {

    &.small {
      flex-direction: column;
      gap: 50px;
    }

    .connection-message {
      width: 300px;
    }
  }
}
</style>
