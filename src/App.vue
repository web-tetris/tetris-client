<script lang="ts" setup>
import { ref } from 'vue'
import Game from '@/widgets/Game.vue'
import PlayersSelect from '@/widgets/PlayersSelect.vue'
import Button from '@/ui/Button.vue'
import Settings from '@/widgets/Settings.vue'

const players = ref(1)

const settingsShowed = ref<boolean>(false)
function toggleSettings() {
  settingsShowed.value = !settingsShowed.value
}
</script>

<template>
  <div class="app">
    <PlayersSelect v-model:players="players" class="players" />
    <div class="game-list">
      <Game v-for="i in players" :key="i" class="game" />
    </div>
    <Button large class="menu-button" icon="sliders" @click="toggleSettings" />
  </div>
  <Settings v-model:showed="settingsShowed" />
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

  .menu-button {
    margin: 0 20px 20px auto;
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
