<script setup lang="ts">
import { toRefs } from 'vue'
import Button from '@/ui/Button.vue'

const props = defineProps<{
  title: string
  closable: boolean
  relative?: boolean
}>()

const showed = defineModel<boolean>('showed', { required: true })

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
@use '../styles/constants';

.modal {
  padding: 20px;
  position: fixed;
  left: 50%;
  top: 25%;
  transform: translate(-50%, -20%);
  border-radius: 10px;
  box-shadow: 0 0 10px 0 constants.$color-primary-2;
  width: 60%;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .header {
    display: flex;
    align-items: center;
    font-weight: bold;

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
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    text-align: center;
  }

  &.relative {
    position: absolute;
  }

  @media (max-width: constants.$breakpoint-sm) {
    padding: 15px;
    width: 80%;
  }
}
</style>
