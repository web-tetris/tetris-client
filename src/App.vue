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
  flex: 1;
}
</style>

<style lang="scss">
@use 'styles/mixins';
@use 'styles/constants';

@import 'styles/globals';
@import 'styles/typography';
@import 'styles/libraries';
@import 'styles/animation';

html, body {
  height: 100%;
  width: 100%;
}

#app {
  @include mixins.size(fill);
  position: absolute;
  display: flex;
  color: constants.$color-gray
}
</style>
