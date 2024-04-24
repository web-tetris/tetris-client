import { ref, shallowReadonly } from 'vue'
import { defineStore } from 'pinia'

export const useHighscoresStore = defineStore('highscores', () => {
  const highscores = ref<number []>([11, 9, 8, 7, 6])
  const currentScore = ref<number>()

  function add(score: number) {
    for (let i = 0; i < highscores.value.length; i++) {
      if (score > highscores.value[i]) {
        highscores.value.splice(i, 0, score)
        currentScore.value = i
        return
      }
    }
    highscores.value.push(score)
    currentScore.value = highscores.value.length - 1
  }

  return {
    highscores: shallowReadonly(highscores),
    currentScore: shallowReadonly(currentScore),

    add,
  }
})
