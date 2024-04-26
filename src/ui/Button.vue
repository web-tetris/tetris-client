<script setup lang="ts">
import { toRefs } from 'vue'

import type { RouteLocationRaw } from 'vue-router'
import GradientWrapper from '@/ui/GradientWrapper.vue'
import { useSoundStore } from '@/stores/sound'

const props = defineProps<{
  icon?: string
  src?: string
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
      <span v-if="props.label" class="label">{{ label }}</span>
      <!--      <img v-if="props.src" alt="icon" :src="props.src" class="image"> -->
    </component>
  </GradientWrapper>
</template>

<style scoped lang="scss">
.wrapper {

  .button {
    padding: 3px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    width: 100%;

    .image {
      width: 40px;
      height: 40px;
    }

    &.large {
      border-radius: 8px;
      padding: 10px 10px;
      gap: 20px;

      .icon {
        font-size: 1.5rem;
      }

      .label {
        font-size: 22px;
        color: var(--primary-1);
        font-weight: bold;
      }
    }

    &.flat {
      border: none;
    }
  }

}
</style>
