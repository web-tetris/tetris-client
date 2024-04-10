<script lang="ts" setup>
import { ref } from 'vue'
import { useEventListener, useToggle, whenever } from '@vueuse/core'
import Game from '@/widgets/Game.vue'
import PlayersSelect from '@/widgets/PlayersSelect.vue'
import Button from '@/ui/Button.vue'
import Settings from '@/widgets/Settings.vue'
import { useHighscores } from '@/hooks/highscores'
import Highscore from '@/widgets/Highscore.vue'
import { MultiplayerMode } from '@/consts/multiplayer-mode'
import { colors } from '@/consts/random-colors'
import { useSoundEffects } from '@/hooks/sound-effects'

const players = ref(1)
const multiplayerMode = ref<MultiplayerMode>(MultiplayerMode.VERSUS)
whenever(() => players.value === 1, () => multiplayerMode.value = MultiplayerMode.VERSUS)

const [settingsShowed, toggleSettings] = useToggle(false)

const { highscores, currentScore, add } = useHighscores()

const { themeSound } = useSoundEffects()
const stop = useEventListener(['keydown', 'mousedown'], () => {
  themeSound()
  stop()
})
</script>

<template>
  <div class="app">
    <Highscore class="highscore" :highscores="highscores" :current-score="currentScore" />

    <div class="body">
      <PlayersSelect v-model:players="players" v-model:multiplayer-mode="multiplayerMode" class="players" />

      <div class="game-list">
        <template v-if="multiplayerMode === MultiplayerMode.VERSUS">
          <Game v-for="i in players" :key="i" class="game" :multiplayer-mode="multiplayerMode" :players="players" @add-score="add" />
        </template>

        <template v-else>
          <Game class="game" :players="players" :multiplayer-mode="multiplayerMode" @add-score="add" />
        </template>
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
