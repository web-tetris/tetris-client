<script setup lang="ts">
import { computed } from 'vue'
import { useVModels } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { ControlType } from '@/consts/control-type'
import { useGamepad } from '@/hooks/gamepad'
import type { SelectOption } from '@/types/select-option'
import Select from '@/ui/Select.vue'

const props = defineProps<{
  control: ControlType
  gamepad: number
}>()

const emits = defineEmits<{
  'update:control': [ControlType]
  'update:gamepad': [number]
}>()

const { control, gamepad } = useVModels(props, emits)

const { t } = useI18n()

const controlsOptions = computed <SelectOption <ControlType>[]>(() => [
  {
    label: t('game.arrow'),
    value: ControlType.ARROWS,
    icon: 'bi bi-arrows-move',
  },
  {
    label: t('game.gamepad'),
    value: ControlType.GAMEPAD,
    icon: 'bi bi-controller',
  },
  {
    label: t('game.wasd'),
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
    <template v-if="control === ControlType.GAMEPAD">
      <Select
        v-if="gamepads.length"
        v-model="gamepad"
        label="Gamepads"
        :options="gamepadOptions"
      />
      <div v-else class="connection-message">
        {{ t('game.connection') }}
      </div>
    </template>

    <Select
      v-model="control"
      :label="t('game.game-controls')"
      :options="controlsOptions"
    />
  </div>
</template>

<style scoped lang="scss">
.controllers {
  display: flex;
  flex-direction: column;
  gap: 40px;

  .connection-message {
    color: gray;
    text-align: center;
  }
}
</style>
