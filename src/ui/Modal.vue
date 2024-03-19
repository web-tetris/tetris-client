<script setup lang="ts">
import { useVModels } from '@vueuse/core'
import { toRefs } from 'vue'
import Button from '@/ui/Button.vue'

const props = defineProps<{
  showed: boolean
  title: string
  closable: boolean
  relative?: boolean
}>()

const emits = defineEmits<{
  'update:showed': [boolean]
}>()

const { showed } = useVModels(props, emits)

const { relative } = toRefs(props)
</script>

<template>
  <div v-if="showed" class="modal" :class="{ relative }">
    <div class="header">
      <div class="title">
        {{ title }}
      </div>
      <Button v-if="closable" class="btn" icon="x-lg" flat @click="showed = false" />
    </div>
    <div class="body">
      <slot name="default" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -20%);
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgb(146, 184, 227);
  width: 400px;
  background-color: white;
  display: flex;
  flex-direction: column;

  .header {
    display: flex;
    align-items: center;
    padding: 10px;

    .title {
      flex: 1;
      text-align: center;
      font-size: 20px;
    }

    .btn {
      margin: 0 10px;
    }
  }

  .body {
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &.relative {
    position: absolute;
  }
}
</style>
