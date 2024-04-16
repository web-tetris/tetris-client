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
      <input v-model="modelValue" class="input" @focus="$event.target.select()">
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
  gap: 5px;

  .btn {
    border: 0;
  }

  .input {
    width: 40px;
    border: none;
    border-radius: 8px;
    text-align: center;

    &:focus {
      outline: none;
    }

    &::selection {
      background: #e7e6e6;
    }
  }
}
</style>
