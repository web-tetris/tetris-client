<script setup lang="ts">
import type { Slot } from 'vue'
import { toRefs } from 'vue'

const props = defineProps<{
  flat?: boolean
  hovering?: boolean
}>()

defineSlots<{
  default: Slot
}>()

const { flat, hovering } = toRefs(props)
</script>

<template>
  <div class="wrapper" :class="{ flat, hovering }">
    <div class="inner">
      <slot name="default" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
    position: relative;
    overflow: hidden;
    border-radius: 10px;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, var(--primary-0), var(--primary-1) 51%, var(--primary-2)) var(--x, 0)/ 200%;
        transition: 1.8s;
    }

    &.hovering:hover::before {
        --x: 100%;
    }

    &.flat::before {
        display: none;
    }

    &.flat:hover::before {
        display: block;
    }

    .inner {
        position: relative;
        margin: 2px;
        background-color: white;
        border-radius: 8px;
    }
}
</style>
