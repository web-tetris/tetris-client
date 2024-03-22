import { ref, shallowReadonly } from 'vue'

export function useHighscores() {
  const highscores = ref<number []>([])

  function add(score: number) {
    for (let i = 0; i < highscores.value.length; i++) {
      if (score > highscores.value[i]) {
        highscores.value.splice(i, 0, score)
        return
      }
    }
    highscores.value.push(score)
    console.log(highscores.value.map(i => i))
  }

  return {
    highscores: shallowReadonly(highscores),

    add,
  }
}
