<script setup lang="ts">
import { useVModels } from '@vueuse/core'
import Button from '@/ui/Button.vue'
import GradientWrapper from '@/ui/GradientWrapper.vue'

const props = defineProps<{
  modelValue: number
}>()

const emits = defineEmits<{
  'update:modelValue': [number]
}>()

const { modelValue } = useVModels(props, emits)
</script>

<template>
  <GradientWrapper>
    <div class="input">
      <Button
        :no-stroke="true"
        class="btn" icon="arrow-down" flat
        @click="modelValue = +modelValue - 1"
      />
      <input v-model="modelValue" class="value-input" @focus="$event.target.select()">
      <Button
        :no-stroke="true"
        class="btn" icon="arrow-up" flat
        @click="modelValue = +modelValue + 1"
      />
    </div>
  </GradientWrapper>
</template>

<style scoped lang="scss">
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
</style>
