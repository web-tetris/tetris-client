<script setup lang="ts">
import { toRefs } from 'vue'

import GradientWrapper from '@/ui/GradientWrapper.vue'

const props = defineProps<{
  icon?: string
  flat?: boolean
  label?: string
  large?: boolean
}>()

const { flat, large } = toRefs(props)
</script>

<template>
  <GradientWrapper :flat="props.flat" hovering>
    <button class="button" :class="{ flat, large }">
      <i v-if="props.icon" :class="`bi bi-${props.icon}`" class="icon" />
      <span v-if="props.label">{{ label }}</span>
    </button>
  </GradientWrapper>
</template>

<style scoped lang="scss">
.button {
    padding: 3px 10px;
    display: flex;
    justify-content: center;
    gap: 10px;
    cursor: pointer;

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
