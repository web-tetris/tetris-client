<script lang="ts" setup>
import { ref } from 'vue'
import Game from '@/widgets/Game.vue'
import Select from '@/ui/Select.vue'
import type { SelectOption } from '@/types/select-option'

const players = ref<number>(1)
const options: SelectOption[] = Array.from({ length: 3 }, (_, i) => ({
  value: i + 1,
  label: `${i + 1} player${i > 0 ? 's' : ''}`,
}))
</script>

<template>
  <div class="app">
    <Select v-model="players" class="players" :options="options" label="Number of players" />

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
    width: 300px;
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
