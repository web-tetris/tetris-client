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
      <div
        v-for="(score, index) in props.highscores"
        :key="index"
        class="score"
      >
        <div v-if="index < 3" class="value">
          <img v-if="index === 0" alt="1" class="img" src="@/assets/1st-prize.png">
          <img v-if="index === 1" alt="2" class="img" src="@/assets/2nd-place.png">
          <img v-if="index === 2" alt="3" class="img" src="@/assets/3rd-place.png">
        </div>

        <div v-else class="value index">
          {{ index + 1 }}
        </div>

        <div class="value">
          {{ score }}
        </div>
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
    justify-content: space-between;

    .score {
      display: flex;

      .value {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;

        .img {
          width: 100%;
        }

        &.index {
          font-size: 13px;
          color: #87878c;
        }
      }
    }
  }
}
</style>
