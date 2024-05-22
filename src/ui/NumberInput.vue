<script setup lang="ts">
import { syncRef, useVModels, whenever } from '@vueuse/core'
import { computed, ref } from 'vue'
import Button from '@/ui/Button.vue'
import GradientWrapper from '@/ui/GradientWrapper.vue'

const props = defineProps<{
  modelValue: number
  label?: string
  min?: number
  max?: number
}>()

const emits = defineEmits<{
  'update:modelValue': [number]
}>()

const { modelValue } = useVModels(props, emits)

const value = ref<string>(String(modelValue.value))
syncRef(modelValue, computed({
  get: () => parseInt(value.value),
  set: v => value.value = String(v),
}))
whenever(() => isNaN(+value.value), () => value.value = value.value.replaceAll(/\D/g, ''))

function increase() {
  if (props.max != null && modelValue.value < props.max)
    modelValue.value++
}

function decrease() {
  if (props.min != null && modelValue.value > props.min)
    modelValue.value--
}

function onMouseWheel(event: WheelEvent) {
  event.deltaY > 0 ? increase() : decrease()
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
          class="btn"
          icon="arrow-down"
          flat
          @click="decrease"
        />
        <input
          v-model="value"
          class="value-input"
          @wheel="onMouseWheel"
        >
        <Button
          :no-stroke="true"
          class="btn" icon="arrow-up" flat
          @click="increase"
        />
      </div>
    </GradientWrapper>
  </div>
</template>

<style scoped lang="scss">
@use '../styles/constants';

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
    width: 100%;

    .btn {
      border: 0;
    }

    .value-input {
      border: none;
      border-radius: 8px;
      text-align: center;
      width: 100px;
      color: constants.$color-gray;

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
