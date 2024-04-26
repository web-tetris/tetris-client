<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import NumberInput from '@/ui/NumberInput.vue'
import { useSettingsStore } from '@/stores/settings'

const { difficulty } = storeToRefs(useSettingsStore())

const { t } = useI18n()
</script>

<template>
  <div class="difficulty">
    <NumberInput v-model="difficulty" class="value" :label="t('menu.difficulty')" />
  </div>
</template>

<style scoped lang="scss">
  .difficulty {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;

    .value {
      flex: 1;
    }
  }
</style>
