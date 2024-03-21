<script setup lang="ts">
import GradientWrapper from '@/ui/GradientWrapper.vue'

const props = defineProps<{
  icon?: string
  label?: string
  flat?: boolean
}>()
</script>

<template>
  <GradientWrapper :flat="props.flat" hovering>
    <div class="button">
      <i v-if="props.icon" :class="`bi bi-${props.icon}`" />
      <span v-if="props.label">{{ label }}</span>
    </div>
  </GradientWrapper>
</template>

<style scoped lang="scss">
.button {
    padding: 3px 10px;
    display: flex;
    justify-content: center;
    gap: 10px;
    cursor: pointer;
}
</style>
