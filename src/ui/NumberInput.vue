<script setup lang="ts">
import { useVModels } from '@vueuse/core'
import Button from '@/ui/Button.vue'
import GradientWrapper from '@/ui/GradientWrapper.vue'

const props = defineProps<{
  modelValue: number
  label?: string
}>()

const emits = defineEmits<{
  'update:modelValue': [number]
}>()

const { modelValue } = useVModels(props, emits)

function increase(event: WheelEvent) {
  if (event.deltaY > 0)
    modelValue.value = +modelValue.value + 1
  else
    modelValue.value = +modelValue.value - 1
}
</script>

<template>
  <div class="input-wrapper">
    <div class="label">
      <div v-if="props.label">
        {{ label }}
      </div>
    </div>

    <GradientWrapper>
      <div class="input">
        <Button
          :no-stroke="true"
          class="btn" icon="arrow-down" flat
          @click="modelValue = +modelValue - 1"
        />
        <input
          v-model="modelValue"
          class="value-input"
          @wheel="increase"
          @focus="$event.target.select()"
        >
        <Button
          :no-stroke="true"
          class="btn" icon="arrow-up" flat
          @click="modelValue = +modelValue + 1"
        />
      </div>
    </GradientWrapper>
  </div>
</template>

<style scoped lang="scss">
.input-wrapper {
  position: relative;

  .label {
    width: 100%;
    position: absolute;
    top: -25px;
  }

  .input {
    display: flex;
    justify-content: space-around;
    align-items: center;

    .btn {
      border: 0;
    }

    .value-input {
      border: none;
      border-radius: 8px;
      text-align: center;
      width: 30px;

      &:focus {
        outline: none;
      }

      &::selection {
        background: #e7e6e6;
      }
    }
  }
}
</style>
