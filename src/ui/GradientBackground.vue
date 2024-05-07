<script setup lang="ts">
import type { Slot } from 'vue'
import { shallowRef } from 'vue'
import { useElementSize } from '@vueuse/core'
import Block from '@/ui/Block.vue'
import { randomInt } from '@/utils/random'

const props = withDefaults(defineProps<{
  clear?: boolean
}>(), {
  clear: false,
})

defineSlots<{
  default: Slot
}>()

const root = shallowRef<HTMLElement>()
const { width, height } = useElementSize(root)
function getPositionStyle() {
  const size = randomInt(40) + 20
  return {
    top: `${randomInt(height.value - 80)}px`,
    left: `${randomInt(width.value - 80)}px`,
    width: `${size}px`,
    height: `${size}px`,
  }
}
</script>

<template>
  <div ref="root" class="background">
    <template v-if="!props.clear">
      <Block
        v-for="i in 40"
        :key="i"
        pulse
        :block="`block-${randomInt(7) + 1}`"
        class="block"
        :style="getPositionStyle()"
      />
    </template>
    <div class="inner">
      <slot name="default" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../styles/constants';
@use '../styles/animation';

.background {
  position: relative;

  &::before {
    z-index: -1;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.2;
    background: linear-gradient(135deg, constants.$color-primary-0, white 20% 80%, constants.$color-primary-1);
  }

  &::after {
    content: '';
    width: 20%;
    height: 100%;
    background: linear-gradient(180deg, white 10%, transparent);
    position: absolute;
    z-index: -1;
    top: 0;
    left: 40%;
  }

  .block {
    position: absolute;
    animation: pulse 4s infinite;
    opacity: 0.2;
    z-index: -2;
  }
}
</style>
