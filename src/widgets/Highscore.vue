<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { colors } from '@/consts/random-colors'

const props = defineProps<{
  highscores: number[]
}>()

const { t } = useI18n()
</script>

<template>
  <div class="highscore">
    <div class="title">
      {{ t('highscore.title') }}
    </div>

    <div class="scores">
      <div v-for="(score, index) in highscores" :key="index">
        {{ score }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.highscore {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  border: 1px solid v-bind('colors[2]');
  border-radius: 8px;
  padding: 10px;

  .title {
    font-size: 20px;
  }

  .scores {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
