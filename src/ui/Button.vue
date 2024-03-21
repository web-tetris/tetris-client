<script setup lang="ts">
import { toRefs } from 'vue'

const props = defineProps<{
  icon?: string
  flat?: boolean
  label?: string
  large?: boolean
}>()

const { flat, large } = toRefs(props)
</script>

<template>
  <button class="button" :class="{ flat, large }">
    <i v-if="props.icon" :class="`bi bi-${props.icon}`" class="icon" />
    <span v-if="props.label">{{ label }}</span>
  </button>
</template>

<style scoped lang="scss">
.button {
  border: 1px solid #c9c8c8;
  border-radius: 8px;
  padding: 3px 10px;
  display: flex;
  justify-content: center;
  gap: 10px;

  &:hover {
    cursor: pointer;
    background-color: aliceblue;
  }

  &.large {
    border-radius: 20px;
    padding: 10px 20px;

    .icon {
      font-size: 1.5rem;
      color: #757575;
    }
  }

  &.flat {
    border: none;
  }
}
</style>
