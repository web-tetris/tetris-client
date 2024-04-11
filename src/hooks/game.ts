import type { Ref } from 'vue'
import { computed, ref, shallowReadonly, watch } from 'vue'

import { tryOnMounted, useInterval } from '@vueuse/core'
import { BlockColor } from '@/consts/block-color'
import { projectFigure } from '@/utils/figure'
import { MoveDirection } from '@/consts/move-direction'
import { useSoundEffects } from '@/hooks/sound-effects'
import { useFiguresArray } from '@/hooks/figures-array'
import { useGameField } from '@/hooks/game-field'

export function useGame({
  difficult,
  figureAmount,
  add,
}: {
  difficult: Ref<number>
  figureAmount: Ref<number>
  add: (score: number) => void
}) {
  const { field, generateField, addFigure, stackLines } = useGameField({ figureAmount })

  const {
    figures,
    currentFigures,
    nextFigures,
    push,
    move,
    rotate,
  } = useFiguresArray({ field, figureAmount })

  const soundEffects = useSoundEffects()

  const score = ref<number>(0)
  const delta = 10
  const initial = 2000
  const min = 200
  const offset = 10
  const speed = 0.3
  function calculateInterval(): number {
    return (initial / difficult.value - delta) / ((score.value + offset) ** speed) + min
  }
  const { pause, resume, counter } = useInterval(calculateInterval, { controls: true })

  const gameOver = ref<boolean>(false)
  function gameOverCheck() {
    const isGameOver = !field.value[0].includes(BlockColor.EMPTY)
    if (isGameOver) {
      soundEffects.gameOverSound()
      gameOver.value = true
      add(score.value)
      pause()
    }
  }

  function reset() {
    generateField()
    score.value = 0
    difficult.value = 1
    gameOver.value = false
    figures.value.forEach((figure, index) => push(index))
    resume()
  }
  tryOnMounted(reset)

  function cycle() {
    const available = figures.value.map(figure => figure.move(MoveDirection.DOWN))
    if (available.includes(false))
      soundEffects.figureDropSound()

    figures.value.forEach((figure, i) => {
      if (!available[i]) {
        addFigure(figure.currentFigure.value, figure.position.value)
        push(i)
      }
    })

    score.value += stackLines() ** 2
    gameOverCheck()
  }
  watch(counter, cycle)

  const matrix = computed(() => {
    let projection = field.value
    for (const { currentFigure, position } of figures.value)
      projection = projectFigure(projection, currentFigure.value, position.value)
    return projection
  })

  return {
    matrix,
    currentFigures: shallowReadonly(currentFigures),
    nextFigures: shallowReadonly(nextFigures),
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
