<script setup lang="ts">
const props = defineProps<{
  icon?: string
  flat?: boolean
}>()

const slots = defineSlots<{
  default: () => void
}>()
</script>

<template>
  <button class="button" :class="{ flat }">
    <i v-if="props.icon" :class="`bi bi-${props.icon}`" />
    <slot v-if="slots.default" name="default" />
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

  &.flat {
    border: none;
  }
}
</style>
