<script setup lang="ts">
import { useVModels } from '@vueuse/core'
import Button from '@/ui/Button.vue'

const props = defineProps<{
  showed: boolean
  title: string
}>()

const emits = defineEmits<{
  'update:showed': [boolean]
}>()

const { showed } = useVModels(props, emits)
</script>

<template>
  <div v-if="showed" class="menu">
    <div class="header">
      <div class="title">
        {{ title }}
      </div>
      <Button class="btn" @click="showed = false">
        x
      </Button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.menu {
  position: fixed;
  left: 50%;
  top: 20%;
  transform: translate(-50%, -20%);
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgb(146, 184, 227);
  width: 400px;
  height: 450px;
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
    }

    .btn {
      margin: 0 10px;
    }
  }

  .body {
    background-color: #8D9440;
    flex: 1;
    padding: 20px;

  }

}
</style>
