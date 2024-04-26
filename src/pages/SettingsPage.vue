<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import Difficulty from '@/widgets/Difficulty.vue'
import StyleSelect from '@/widgets/StyleSelect.vue'
import LanguageSelect from '@/widgets/LanguageSelect.vue'
import ControllerSelect from '@/widgets/ControllerSelect.vue'
import PlayersSelect from '@/widgets/PlayersSelect.vue'
import { useSettingsStore } from '@/stores/settings'
import Button from '@/ui/Button.vue'

const { players } = storeToRefs(useSettingsStore())
const { t } = useI18n()
</script>

<template>
  <div class="settings-page">
    <div class="logo">
      Tetris
    </div>

    <div class="body">
      <div class="common-settings">
        <div class="label">
          {{ t('settings-page.common-label') }}
        </div>

        <div class="select">
          <LanguageSelect />
          <StyleSelect />
        </div>
      </div>

      <div class="play-settings">
        <div class="label">
          {{ t('settings-page.play-label') }}
        </div>

        <div class="select">
          <Difficulty />
          <PlayersSelect />
        </div>
      </div>

      <div class="controller-settings">
        <div class="label">
          {{ t('settings-page.controller-label') }}
        </div>

        <div class="select">
          <ControllerSelect
            v-for="player in players"
            :key="player"
            :player="player"
          />
        </div>
      </div>
    </div>

    <Button large :label="t('settings-page.start')" link="/game" class="button" />
  </div>
</template>

<style scoped lang="scss">
.settings-page {
  display: flex;
  flex-direction: column;
  gap: 50px;
  align-items: center;

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
  }

  .body {
    height: 400px;
    padding: 20px;
    display: flex;
    justify-content: center;
    gap: 100px;

    .common-settings, .play-settings, .controller-settings {
      display: flex;
      flex-direction: column;
      gap: 100px;
      width: 300px;

      .label {
        align-self: center;
        font-size: 20px;
      }

      .select {
        display: flex;
        flex-direction: column;
        gap: 50px;
      }
    }

    .common-settings .label {
      color: var(--primary-0);
    }

    .play-settings .label {
      color: var(--primary-1);
    }

    .controller-settings .label {
      color: var(--primary-2);
    }
  }

  .button {
    width: 300px;
  }

}
</style>
