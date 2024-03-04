<script lang="ts" setup>
import Game from '@/widgets/Game.vue'
</script>

<template>
  <div class="app">
    <Game class="game" />
  </div>
</template>

<style lang="scss" scoped>
@use 'styles/transitions';
@use 'styles/constants';
@use 'styles/mixins';

.app {
  @include mixins.size(fill);
  display: flex;

  .game {
    margin: 30px auto auto auto;
  }

}
</style>

<style lang="scss">
@use 'styles/mixins';

@import 'styles/globals';
@import 'styles/typography';

#app {
  @include mixins.size(fill);
  position: absolute;
  display: flex;
}
</style>
