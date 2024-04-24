import type { Ref } from 'vue'
import { computed, ref, shallowReadonly, watch } from 'vue'

import { tryOnMounted, useInterval } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { BlockColor } from '@/consts/block-color'
import { projectFigure } from '@/utils/figure'
import { MoveDirection } from '@/consts/move-direction'
import { useSoundStore } from '@/stores/sound'
import { useFiguresArray } from '@/hooks/figures-array'
import { useGameField } from '@/hooks/game-field'
import { useSettingsStore } from '@/stores/settings'
import { useHighscoresStore } from '@/stores/highscores'

export function useGame({
  figureAmount,
}: {
  figureAmount: Ref<number>
}) {
  const { field, generateField, addFigure, stackLines } = useGameField({ figureAmount })

  const {
    current,
    next,
    position,
    push,
    move,
    rotate,
  } = useFiguresArray({ field, figureAmount })

  const { gameOverSound, figureDropSound } = useSoundStore()

  const score = ref<number>(0)
  const delta = 10
  const initial = 2000
  const min = 200
  const offset = 10
  const speed = 0.3
  const { difficulty } = storeToRefs(useSettingsStore())
  function calculateInterval(): number {
    return (initial / difficulty.value - delta) / ((score.value + offset) ** speed) + min
  }
  const { pause, resume, counter } = useInterval(calculateInterval, { controls: true })

  const { add } = useHighscoresStore()
  const gameOver = ref<boolean>(false)
  function gameOverCheck() {
    const isGameOver = !field.value[0].includes(BlockColor.EMPTY)
    if (isGameOver) {
      gameOverSound()
      gameOver.value = true
      add(score.value)
      pause()
    }
  }

  function reset() {
    generateField()
    score.value = 0
    gameOver.value = false
    Array.from({ length: figureAmount.value }).forEach((_, i) => push(i))
    resume()
  }
  tryOnMounted(reset)

  function cycle() {
    const available = Array.from({ length: figureAmount.value }).map((_, i) => move(i, MoveDirection.DOWN))
    if (available.includes(false))
      figureDropSound()

    available.forEach((_, i) => {
      if (!available[i]) {
        addFigure(current.value[i], position.value[i])
        push(i)
      }
    })

    score.value += stackLines() ** 2
    gameOverCheck()
  }
  watch(counter, cycle)

  const matrix = computed(() => {
    let projection = field.value

    for (let i = 0; i < figureAmount.value; i++)
      projection = projectFigure(projection, current.value[i], position.value[i])

    return projection
  })

  return {
    matrix,
    currentFigures: shallowReadonly(current),
    nextFigures: shallowReadonly(next),
    score: shallowReadonly(score),
    gameOver: shallowReadonly(gameOver),

    move,
    rotate,
    reset,
    pause,
    resume,
    counter,
  }
}
