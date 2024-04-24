<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useHighscoresStore } from '@/stores/highscores'

const { highscores, currentScore } = storeToRefs(useHighscoresStore())
const { t } = useI18n()

function getImageUrl(index: number) {
  return new URL(`../assets/cup/${index}.png?url`, import.meta.url).href
}

const place = {
  0: 'first',
  1: 'second',
  2: 'third',
}
</script>

<template>
  <div class="high-score">
    <div class="title">
      {{ t('highscore.title') }}
    </div>

    <div class="scores">
      <div
        v-for="(score, index) in highscores"
        :key="index"
        class="result"
        :class="[
          { 'new-score': index === currentScore },
          place[index] || 'other',
        ]"
      >
        <div class="place">
          <img v-if="index < 3" alt="prize" class="image" :src="getImageUrl(index)">
          <span v-else class="index">{{ index + 1 }}</span>
        </div>

        <div class="score">
          {{ score }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.high-score {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  border: 1px solid var(--primary-2);
  border-radius: 8px;
  padding-top: 10px;

  .title {
    font-size: 20px;
  }

  .scores {
    display: flex;
    flex-direction: column;
    width: 100%;

    .result {
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 5px 0;
      border-bottom: 1px dotted var(--primary-2);

      &:last-child {
        border-bottom: none;
        border-radius: 0 0 8px 8px;
      }

      &.new-score {
        --color: white;
        background: linear-gradient(90deg, white 20%, var(--color));
        background-size: 200% 200%;
        animation: gradient 2s ease-in;

        @keyframes gradient {
          0% {
            background-position: 100% 50%;
          }
          50% {
            background-position: 50% 50%;
          }
          100% {
            background-position: 0 50%;
          }
        }

        &.first {
          --color: #FFB600;
        }

        &.second {
          --color: #BFBFBF;
        }

        &.third {
          --color: #ffba83;
        }

        &.other {
          --color: var(--primary-2);
        }
      }

      .place {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;

        .image {
          width: 100%;
        }

        .index {
          color: #9b9b9b;
        }
      }

      .score {
        font-weight: bold;
      }
    }
  }
}
</style>
