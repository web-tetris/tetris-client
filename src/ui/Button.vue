<script setup lang="ts">
import { toRefs } from 'vue'

import GradientWrapper from '@/ui/GradientWrapper.vue'
import { useSoundEffects } from '@/hooks/sound-effects'

const props = defineProps<{
  icon?: string
  flat?: boolean
  label?: string
  large?: boolean
  noStroke?: boolean
}>()

const { flat, large, noStroke } = toRefs(props)
const { buttonSound } = useSoundEffects()
</script>

<template>
  <GradientWrapper :flat="props.flat" hovering :no-stroke="noStroke">
    <button class="button" :class="{ flat, large }" @click="buttonSound">
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
</style>
