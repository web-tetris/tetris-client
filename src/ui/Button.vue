<script setup lang="ts">
defineSlots<{
  default: () => void
}>()
</script>

<template>
  <button class="button">
    <slot name="default" />
  </button>
</template>

<style scoped lang="scss">
.button {
  border: 1px solid gray;
  border-radius: 8px;
  padding: 3px 10px;
}
</style>
