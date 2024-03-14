<script lang="ts" setup>
import { ref } from 'vue'
import Game from '@/widgets/Game.vue'
import PlayersSelect from '@/widgets/PlayersSelect.vue'

const players = ref(1)
</script>

<template>
  <div class="app">
    <PlayersSelect v-model:players="players" class="players" />
    <div class="game-list">
      <Game v-for="i in players" :key="i" class="game" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use 'styles/transitions';
@use 'styles/constants';
@use 'styles/mixins';

.app {
  @include mixins.size(fill);
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .players {
    margin: 0 auto;
  }

  .game-list {
    display: flex;
    justify-content: space-around;
  }
}
</style>

<style lang="scss">
@use 'styles/mixins';

@import 'styles/globals';
@import 'styles/typography';
@import 'styles/libraries';

#app {
  @include mixins.size(fill);
  position: absolute;
  display: flex;
}
</style>
