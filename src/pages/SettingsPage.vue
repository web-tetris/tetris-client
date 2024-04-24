<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { MultiplayerMode } from '@/consts/multiplayer-mode'
import Difficulty from '@/widgets/Difficulty.vue'
import StyleSelect from '@/widgets/StyleSelect.vue'
import LanguageSelect from '@/widgets/LanguageSelect.vue'
import ControllerSelect from '@/widgets/ControllerSelect.vue'
import PlayersSelect from '@/widgets/PlayersSelect.vue'
import { useSettingsStore } from '@/stores/settings'
import Button from '@/ui/Button.vue'

const settingsStore = useSettingsStore()
const { blockStyle, multiplayerMode, controlType, players, gamepadIndex } = storeToRefs(settingsStore)
</script>

<template>
  <div class="settings-page">
    <div class="logo">
      Tetris
    </div>

    <div class="body">
      <LanguageSelect class="language" />

      <StyleSelect
        v-model:style="blockStyle"
        class="style"
        :class="{ 'co-op': multiplayerMode === MultiplayerMode.CO_OP }"
      />

      <Difficulty class="difficulty" />

      <PlayersSelect
        v-model:players="players"
        v-model:multiplayer-mode="multiplayerMode"
        class="players"
      />

      <ControllerSelect
        v-for="player in players"
        :key="player"
        v-model:control="controlType"
        v-model:gamepad="gamepadIndex"
        :player="player"
        class="controller"
      />

      <Button label="Start" link="/game" class="button" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.settings-page {
  display: flex;
  flex-direction: column;
  gap: 50px;

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
    background-image: linear-gradient(90deg, var(--primary-0) 30%, var(--primary-1) 50%, var(--primary-2) 60%);
    background-size: 100%;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .body {
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;

    .language {
      width: 300px;
    }

    .style {
      margin-top: 10px;
      width: 300px;
    }

    .difficulty {
      width: 300px;
    }

    .players {
      margin: 20px 0;
    }

    .controller {
      margin-bottom: 10px;
    }

    .button {
      width: 300px;
    }
  }

}
</style>
