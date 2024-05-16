<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { toRefs } from 'vue'
import { useSettingsStore } from '@/stores/settings'
import { BlockStyle } from '@/consts/block-style'
import { BlockColor } from '@/consts/block-color'

const props = withDefaults(defineProps<{
  block: BlockColor
  small?: boolean
  blockSize: string
}>(), {
  small: false,
})

const { block, small } = toRefs(props)

const { blockStyle } = storeToRefs(useSettingsStore())

function getBlockUrl() {
  return new URL(`../assets/blocks/${blockStyle.value}/${block.value}.png?url`, import.meta.url).href
}
</script>

<template>
  <div ref="blockRef" class="block">
    <template v-if="block === BlockColor.EMPTY || blockStyle === BlockStyle.MAIN">
      <div
        class="cell"
        :class="[`color-${block}`, { small }]"
      />
    </template>

    <template v-else>
      <img
        :src="getBlockUrl()"
        alt="block"
        class="cell image"
        :class="{ small }"
      >
    </template>
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/mixins';
@use '@/styles/constants';

.block {
  display: flex;
  justify-content: center;
  align-items: center;

  .cell  {
    height: v-bind(blockSize);
    width: v-bind(blockSize);
    --color: white;
    border-radius: 2px;
    background: var(--color);
    border: 3px solid rgba(black, 0.1);

    &.small {
      @include mixins.size(15px);
      border-width: 1px;

      &.color-empty {
        background: none;
        border: none;
      }
    }

    &.image {
      border: none;
      background-color: #F2F1F5FF;

      &.small {
        background-color: white;
      }
    }

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
}
</style>
