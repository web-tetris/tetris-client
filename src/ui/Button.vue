<script setup lang="ts">
import { toRefs } from 'vue'

import type { RouteLocationRaw } from 'vue-router'
import GradientWrapper from '@/ui/GradientWrapper.vue'
import { useSoundStore } from '@/stores/sound'

const props = defineProps<{
  icon?: string
  flat?: boolean
  label?: string
  large?: boolean
  noStroke?: boolean
  link?: RouteLocationRaw
}>()

const { flat, large, link } = toRefs(props)
const { buttonSound } = useSoundStore()
</script>

<template>
  <GradientWrapper class="wrapper" :flat="flat" hovering :no-stroke="props.noStroke">
    <component
      :is="link ? 'RouterLink' : 'button'"
      :to="link"
      class="button"
      :class="{ flat, large }"
      @click="buttonSound"
    >
      <i v-if="props.icon" :class="`bi bi-${props.icon}`" class="icon" />
      <span v-if="props.label">{{ label }}</span>
    </component>
  </GradientWrapper>
</template>

<style scoped lang="scss">
.wrapper {

  .button {
    padding: 3px 10px;
    display: flex;
    justify-content: center;
    gap: 10px;
    cursor: pointer;
    width: 100%;

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

}
</style>
