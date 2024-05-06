<script setup lang="ts">
import type { BlockColor } from '@/consts/block-color'

const props = defineProps<{
  block: BlockColor
}>()
</script>

<template>
  <div class="cell" :class="`color-${props.block}`" />
</template>

<style scoped lang="scss">
@use '@/styles/mixins';

.cell {
  --color: white;
  @include mixins.size(30px);
  border-radius: 2px;
  background: var(--color);
  border: 3px solid rgba(black, 0.1);

  &.color {

    &-empty {
      --color: #F2F1F5FF;
      border: none;
    }

    &-block-1 {
      --color: #fd8484;
    }

    &-block-2 {
      --color: #fac17d;
    }

    &-block-3 {
      --color: #f8fc8c;
    }

    &-block-4 {
      --color: #9ffc8c;
    }

    &-block-5 {
      --color: #71f2ff;
    }

    &-block-6 {
      --color: #9d8dfc;
    }

    &-block-7 {
      --color: #fd96fd;
    }
  }
}
</style>
