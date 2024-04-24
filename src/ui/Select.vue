<script setup lang="ts" generic="V extends number | string = number">
import { computed, ref, shallowRef } from 'vue'
import { onClickOutside, useVModel } from '@vueuse/core'
import type { SelectOption } from '@/types/select-option'
import GradientWrapper from '@/ui/GradientWrapper.vue'
import { useSoundStore } from '@/stores/sound'

const props = withDefaults(defineProps<{
  label?: string
  secondLabel?: string
  options: SelectOption<V>[]
  modelValue: V
  direction?: 'bottom' | 'top'
}>(), {
  direction: 'bottom',
})

const emits = defineEmits<{
  'update:modelValue': [V]
}>()

const modelValue = useVModel(props, 'modelValue', emits)

const optionShowed = ref<boolean>(false)
const { buttonSound } = useSoundStore()
function toggle() {
  optionShowed.value = !optionShowed.value
  buttonSound()
}
const target = shallowRef()
onClickOutside(target, () => optionShowed.value = false)

const current = computed(() => props.options.find(option => option.value === modelValue.value))
const toggleIcon = computed(() => optionShowed.value ? 'bi bi-chevron-up' : 'bi bi-chevron-down')

function getImageUrl(path: string) {
  return new URL(`../assets/blocks/${path}/block-1.png?url`, import.meta.url).href
}
</script>

<template>
  <div class="select">
    <div class="title">
      <div v-if="props.label">
        {{ label }}
      </div>
      <div v-if="props.secondLabel">
        {{ secondLabel }}
      </div>
    </div>

    <div ref="target" class="options" :class="{ optionShowed, top: props.direction === 'top' }" @click="toggle">
      <GradientWrapper>
        <div class="current">
          <div v-if="current" class="option">
            <i v-if="current.icon" :class="current.icon" />
            <img v-if="current.image" class="icon-image" alt="icon" :src="getImageUrl(current.image)">
            <span>{{ current.label }}</span>
          </div>
          <i class="toggle-icon" :class="toggleIcon" />
        </div>

        <div v-if="optionShowed" class="other">
          <div
            v-for="option in options"
            :key="option.value"
            class="option"
            @click="modelValue = option.value"
          >
            <i v-if="option.icon" :class="option.icon" />
            <img v-if="option.image" class="icon-image" alt="icon" :src="getImageUrl(option.image)">
            <span>{{ option.label }}</span>
          </div>
        </div>
      </GradientWrapper>
    </div>
  </div>
</template>

<style scoped lang="scss">
.select {
  position: relative;
  height: 32px;

  .title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: -25px;
    padding-right: 10px;
  }

  .options {
    position: absolute;
    width: 100%;
    transition: 0.8s;

    &.optionShowed {
      z-index: 1;

      &.top {
        bottom: 0;
      }
    }

    .option {
      width: 100%;
      display: flex;
      gap: 10px;
      align-items: center;

      .icon-image {
        width: 20px;
        height: 20px;
      }
    }

    .current, .other {
      width: 100%;
      display: flex;
      align-items: center;
      padding: 5px;
      cursor: pointer;
    }

    .current {
      padding-left: 10px;

      .toggle-icon {
        margin-left: auto;
      }
    }

    .other {
      display: flex;
      flex-direction: column;
      gap: 5px;

      .option {
        padding: 5px;

        &:hover {
          background-color: #f2f7fc;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>
