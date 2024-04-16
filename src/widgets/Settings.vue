<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import Modal from '@/ui/Modal.vue'
import LanguageSelect from '@/widgets/LanguageSelect.vue'
import PlayersSelect from '@/widgets/PlayersSelect.vue'
import { MultiplayerMode } from '@/consts/multiplayer-mode'
import StyleSelect from '@/widgets/StyleSelect.vue'
import ControllerSelect from '@/widgets/ControllerSelect.vue'
import { ControlType } from '@/consts/control-type'
import Difficulty from '@/widgets/Difficulty.vue'

const showed = defineModel('showed', { required: true })
const players = defineModel('players', { required: true })
const multiplayerMode = defineModel('multiplayerMode', { required: true })
const currentStyle = defineModel('currentStyle', { required: true })
const difficult = defineModel('difficult', { required: true })

const { t } = useI18n()

const currentControl = ref<ControlType>(ControlType.ARROWS)
const currentGamepad = ref<number>(0)
</script>

<template>
  <Modal v-model:showed="showed" :closable="true" :title="t('settings.title')" relative class="modal">
    <LanguageSelect class="language" />

    <StyleSelect
      v-model:style="currentStyle"
      class="style"
      :class="{ 'co-op': multiplayerMode === MultiplayerMode.CO_OP }"
    />

    <Difficulty v-model:difficult="difficult" class="difficult" />

    <PlayersSelect v-model:players="players" v-model:multiplayer-mode="multiplayerMode" class="players" />

    <ControllerSelect
      v-for="player in players"
      :key="player"
      v-model:control="currentControl"
      v-model:gamepad="currentGamepad"
      :player="player"
      class="controller"
    />
  </Modal>
</template>

<style scoped lang="scss">
.modal {

  .language {
    width: 300px;
  }

  .style {
    margin-top: 10px;
    width: 300px;
  }

  .difficult {
    width: 300px;
  }

  .players {
    margin: 20px 0;
  }

  .controller {
    margin-bottom: 10px;
  }

}
</style>
