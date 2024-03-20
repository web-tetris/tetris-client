<script setup lang="ts">
import { useVModels } from '@vueuse/core'
import Button from '@/ui/Button.vue'

const props = defineProps<{
  modelValue: number
}>()

const emits = defineEmits<{
  'update:modelValue': [number]
}>()

const { modelValue } = useVModels(props, emits)
</script>

<template>
  <div class="input">
    <Button class="btn" icon="arrow-down" flat @click="modelValue = +modelValue - 1" />
    <input v-model="modelValue" class="input" @focus="$event.target.select()">
    <Button class="btn" icon="arrow-up" flat @click="modelValue = +modelValue + 1" />
  </div>
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
    border: 1px solid #c9c8c8;
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
