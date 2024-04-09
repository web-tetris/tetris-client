<script setup lang="ts" generic="V extends number | string = number">
import { computed, ref } from 'vue'
import { useVModel } from '@vueuse/core'
import type { SelectOption } from '@/types/select-option'
import GradientWrapper from '@/ui/GradientWrapper.vue'

const props = withDefaults(defineProps<{
  label?: string
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

const opened = ref<boolean>(false)

const current = computed(() => props.options.find(option => option.value === modelValue.value))
const toggleIcon = computed(() => opened.value ? 'bi bi-chevron-up' : 'bi bi-chevron-down')

function getImageUrl(path: string) {
  return new URL(`../assets/blocks/${path}/block-1.png?url`, import.meta.url).href
}
</script>

<template>
  <div class="select">
    <div v-if="props.label" class="title">
      {{ label }}
    </div>

    <div class="options" :class="{ opened, top: props.direction === 'top' }" @click="opened = !opened">
      <GradientWrapper>
        <div class="current">
          <div v-if="current" class="option">
            <i v-if="current.icon" :class="current.icon" />
            <img v-if="current.image" class="icon-image" alt="icon" :src="getImageUrl(current.image)">
            <span>{{ current.label }}</span>
          </div>
          <i class="toggle-icon" :class="toggleIcon" />
        </div>

        <div v-if="opened" class="other">
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
    position: absolute;
    top: -25px;
  }

  .options {
    position: absolute;
    //top: 0;
    //left: 0;
    width: 100%;
    transition: 0.8s;

    &.opened {
      z-index: 1;
    //  display: flex;
    //  flex-direction: column;
    //  gap: 5px;

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
