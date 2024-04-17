<script lang="ts" setup>
import { ref } from 'vue'
import { syncRefs, useEventListener, useToggle, whenever } from '@vueuse/core'
import Game from '@/widgets/Game.vue'
import Button from '@/ui/Button.vue'
import Settings from '@/widgets/Settings.vue'
import { useHighscores } from '@/hooks/highscores'
import Highscore from '@/widgets/Highscore.vue'
import { MultiplayerMode } from '@/consts/multiplayer-mode'
import { useSoundEffects } from '@/hooks/sound-effects'
import { useColors } from '@/hooks/colors'
import { BlockStyle } from '@/consts/block-style'
import { useSettingsService } from '@/hooks/settings'

const currentStyle = ref<BlockStyle>(BlockStyle.MAIN)

const soundEffects = useSoundEffects()
const stop = useEventListener(['keydown', 'mousedown'], () => {
  soundEffects.themeSound()
  stop()
})
syncRefs(currentStyle, soundEffects.style)

const colors = useColors()
syncRefs(currentStyle, colors.style)

const players = ref(1)
const multiplayerMode = ref<MultiplayerMode>(MultiplayerMode.VERSUS)
whenever(() => players.value === 1, () => multiplayerMode.value = MultiplayerMode.VERSUS)

const { highscores, currentScore, add } = useHighscores()

const { difficult } = useSettingsService()

const [settingsShowed, toggleSettings] = useToggle(false)
</script>

<template>
  <div class="app">
    <Highscore class="highscore" :highscores="highscores" :current-score="currentScore" />

    <div class="body">
      <div class="game-list">
        <template v-if="multiplayerMode === MultiplayerMode.VERSUS">
          <Game
            v-for="i in players"
            :key="i"
            v-model:current-style="currentStyle"
            :multiplayer-mode="multiplayerMode"
            :players="players"
            :difficult="difficult"
            :paused="settingsShowed"
            class="game"
            @add="add"
          />
        </template>

        <template v-else>
          <Game
            v-model:current-style="currentStyle"
            :multiplayer-mode="multiplayerMode"
            :players="players"
            :difficult="difficult"
            :paused="settingsShowed"
            class="game"
            @add="add"
          />
        </template>
      </div>
    </div>

    <Button large class="settings-button" icon="sliders" @click="() => toggleSettings()" />
  </div>

  <Settings
    v-model:current-style="currentStyle"
    v-model:showed="settingsShowed"
    v-model:players="players"
    v-model:multiplayer-mode="multiplayerMode"
    v-model:difficult="difficult"
  />
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
    background: linear-gradient(135deg, var(--primary-0), white 20% 80%, var(--primary-1));
  }

  .highscore {
    width: 150px;
    margin: auto;
  }

  .body {
    flex: 1;
    display: flex;
    flex-direction: column;

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
