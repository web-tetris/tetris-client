<script lang="ts" setup>
import { useTitle } from '@vueuse/core'

useTitle('Hello, Vue')
</script>

<template>
  <div class="app-component">
    <RouterView class="page" />
  </div>
</template>

<style lang="scss" scoped>
@use 'shared/styles/transitions';
@use 'shared/styles/constants';
@use 'shared/styles/mixins';

.app-component {
  @include mixins.size(fill);

  .page {
    @include mixins.size(fill);
  }
}
</style>

<style lang="scss">
@use 'shared/styles/mixins';

@import 'core/styles/globals';
@import 'core/styles/typography';

#app {
  @include mixins.size(fill);
  position: absolute;
  display: flex;
}
</style>
