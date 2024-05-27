<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import Difficulty from '@/widgets/Difficulty.vue'
import StyleSelect from '@/widgets/StyleSelect.vue'
import LanguageSelect from '@/widgets/LanguageSelect.vue'
import ControllerSelect from '@/widgets/ControllerSelect.vue'
import PlayersSelect from '@/widgets/PlayersSelect.vue'
import { useSettingsStore } from '@/stores/settings'
import Button from '@/ui/Button.vue'
import GradientBackground from '@/ui/GradientBackground.vue'

const { players } = storeToRefs(useSettingsStore())
const { t } = useI18n()

const { isGreater } = useBreakpoints(breakpointsTailwind)
</script>

<template>
  <GradientBackground class="gradient-background">
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
            <PlayersSelect v-if="isGreater('sm')" />
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

      <Button
        large
        :label="t('settings-page.start')"
        link="/game"
        class="button"
        icon="joystick"
        reverse
      />
    </div>
  </GradientBackground>
</template>

<style scoped lang="scss">
@use '../styles/constants';

.gradient-background {

  .settings-page {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 50px;
    align-items: center;

    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 50px;
      border-radius: 8px;
    }

    .body {
      padding: 20px;
      display: flex;
      justify-content: space-around;
      width: 100%;

      .common-settings, .play-settings, .controller-settings {
        display: flex;
        flex-direction: column;
        gap: 100px;
        width: 400px;
        padding: 50px 30px;
        border: 1px solid constants.$color-gray;
        border-radius: 8px;
        position: relative;
        background: white;
        box-shadow: rgba(0, 0, 0, 0.1) 0 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;

        .label {
          align-self: center;
          text-align: center;
          font-size: 20px;
          position: absolute;
          top: -20px;
          background-color: white;
          border-radius: 8px;
          width: 200px;
        }

        .select {
          display: flex;
          flex-direction: column;
          gap: 50px;
        }
      }
    }

    .button {
      width: 300px;
    }
  }

  @media (max-width: constants.$breakpoint-sm) {
    .settings-page {
      gap: 10px;
      padding-bottom: 30px;

      .logo {
        font-size: 50px;
        margin-top: 10px;
      }

      .body {
        flex-direction: column;
        align-items: center;
        gap: 30px;
        width: 100%;

        .common-settings, .play-settings, .controller-settings {
          width: 90%;
          padding: 30px 10px;

          .select {
            gap: 30px;
          }
        }
      }
    }
  }
}
</style>
