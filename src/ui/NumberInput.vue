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
    <Button class="btn" @click="modelValue -= 1">
      -
    </Button>
    <input v-model="modelValue" class="input">
    <Button class="btn" @click="modelValue += 1">
      +
    </Button>
  </div>
</template>

<style scoped lang="scss">
.input {
  display: flex;
  gap: 5px;

  .btn {
    width: 30px;
    border: 1px solid gray;
    border-radius: 8px;
    text-align: center;
  }

  .input {
    width: 40px;
    border: 1px solid gray;
    border-radius: 8px;
    text-align: center;
  }
}
</style>
