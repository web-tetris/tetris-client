<script setup lang="ts" generic="V extends number | string = number">
import { computed, ref } from 'vue'
import { useVModel } from '@vueuse/core'
import type { SelectOption } from '@/types/select-option'

const props = defineProps<{
  label?: string
  options: SelectOption<V>[]
  modelValue: V
}>()

const emits = defineEmits<{
  'update:modelValue': [V]
}>()

const modelValue = useVModel(props, 'modelValue', emits)

const opened = ref<boolean>(false)

const current = computed(() => props.options.find(option => option.value === modelValue.value))
const toggleIcon = computed(() => opened.value ? 'bi bi-chevron-up' : 'bi bi-chevron-down')
</script>

<template>
  <div class="select">
    <div v-if="props.label" class="title">
      {{ label }}
    </div>

    <div class="options" :class="{ opened }" @click="opened = !opened">
      <div class="current">
        <div v-if="current" class="option">
          <i v-if="current.icon" :class="current.icon" />
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
          <span>{{ option.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.select {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 30px;
  position: relative;
  height: 32px;

  .title {
    position: absolute;
  }

  .options {
    position: absolute;
    top: 30px;
    border: 1px solid #c9c8c8;
    border-radius: 5px;
    width: 100%;

    &.opened {
      display: flex;
      flex-direction: column;
      gap: 5px;
      background-color: white;
      border: none;
      border-radius: 5px;
      box-shadow: 0 0 10px 0 rgb(146, 184, 227);
    }

    .option {
      width: 100%;
      display: flex;
      gap: 10px;
    }

    .current, .other {
      width: 100%;
      display: flex;
      align-items: center;
      padding: 5px;

      &:hover {
        cursor: pointer;
      }
    }

    .current {
      padding-left: 10px;

      .toggle-icon {
        margin-left: auto;
      }
    }

    .other {
      top: 30px;
      display: flex;
      flex-direction: column;
      gap: 5px;

      .option {
        padding: 5px;

        &:hover {
          background-color: aliceblue;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>
