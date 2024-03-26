<script lang="ts" setup>
import { ref } from 'vue'
import { useToggle } from '@vueuse/core'
import Game from '@/widgets/Game.vue'
import PlayersSelect from '@/widgets/PlayersSelect.vue'
import Button from '@/ui/Button.vue'
import Settings from '@/widgets/Settings.vue'
import { colors } from '@/consts/random-colors'
import { useHighscores } from '@/hooks/highscores'
import Highscore from '@/widgets/Highscore.vue'

const players = ref(1)

const [settingsShowed, toggleSettings] = useToggle(false)

const { highscores, add } = useHighscores()
</script>

<template>
  <div class="app">
    <Highscore class="highscore" :highscores="highscores" />

    <div class="body">
      <PlayersSelect v-model:players="players" class="players" />
      <div class="game-list">
        <Game v-for="i in players" :key="i" class="game" @add-score="add" />
      </div>
    </div>

    <Button large class="settings-button" icon="sliders" @click="() => toggleSettings()" />
  </div>
  <Settings v-model:showed="settingsShowed" />
</template>

<style lang="scss" scoped>
@use 'styles/transitions';
@use 'styles/constants';
@use 'styles/mixins';

.app {
  @include mixins.size(fill);
  padding: 30px 20px;
  display: flex;
  gap: 10px;
  position: relative;
  opacity: 1;

  &::before {
    z-index: -1;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.2;
    background: linear-gradient(135deg, v-bind('colors[0]'), white 20% 80%, v-bind('colors[1]'));
  }

  .highscore {
    width: 150px;
    margin: auto;
  }

  .body {
    flex: 1;
    display: flex;
    flex-direction: column;

    .players {
      margin: 20px auto 40px auto;
    }

    .game-list {
      display: flex;
      justify-content: space-around;
    }
  }

  .settings-button {
    margin-top: auto;
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
