import { ref, shallowReadonly } from 'vue'

export function useHighscores() {
  const highscores = ref<number []>([11, 9, 8, 7, 6])

  function add(score: number) {
    for (let i = 0; i < highscores.value.length; i++) {
      if (score > highscores.value[i]) {
        highscores.value.splice(i, 0, score)
        return
      }
    }
    highscores.value.push(score)
  }

  return {
    highscores: shallowReadonly(highscores),

    add,
  }
}
