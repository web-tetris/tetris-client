<script lang="ts" setup>
import { useColors } from '@/hooks/colors'

useColors()
</script>

<template>
  <RouterView class="app" />
</template>

<style lang="scss" scoped>
@use 'styles/mixins';

.app {
  @include mixins.size(fill);
  position: relative;

  &::before {
    z-index: -1;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.2;
    background: linear-gradient(135deg, var(--primary-0), white 20% 80%, var(--primary-1));
  }
}
</style>

<style lang="scss">
@use 'styles/mixins';

@import 'styles/globals';
@import 'styles/typography';
@import 'styles/libraries';
@import 'styles/animation';

#app {
  @include mixins.size(fill);
  position: absolute;
  display: flex;
}
</style>
