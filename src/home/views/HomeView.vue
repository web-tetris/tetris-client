<script lang="ts" setup>
import VueSvg from '@/home/assets/vue.svg'
</script>

<template>
  <div class="home-view">
    <VueSvg class="icon" />
  </div>
</template>

<style lang="scss" scoped>
@use "@/shared/styles/mixins";

.home-view {
  display: flex;

  .icon {
    @include mixins.size(200px);
    margin: auto;
  }
}
</style>
