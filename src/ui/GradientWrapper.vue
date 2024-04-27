<script setup lang="ts">
import type { Slot } from 'vue'
import { toRefs } from 'vue'

const props = defineProps<{
  flat?: boolean
  hovering?: boolean
  noStroke?: boolean
}>()

defineSlots<{
  default: Slot
}>()

const { flat, hovering, noStroke } = toRefs(props)
</script>

<template>
  <div class="wrapper" :class="[{ flat, hovering }, { 'no-stroke': noStroke }]">
    <div class="inner">
      <slot name="default" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../styles/constants';

.wrapper {
  display: flex;
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
      background: linear-gradient(90deg, constants.$color-primary-0, constants.$color-primary-1 51%, constants.$color-primary-2) var(--x, 0)/ 200%;
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

  &.no-stroke:hover::before {
    display: none;
  }

  .inner {
    flex: 1;
    position: relative;
    margin: 2px;
    background-color: white;
    border-radius: 8px;
  }
}
</style>
