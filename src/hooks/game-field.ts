import type { Ref } from 'vue'
import { computed, ref, shallowReadonly, shallowRef, watch } from 'vue'

import { tryOnMounted, useInterval } from '@vueuse/core'
import { BlockColor } from '@/consts/block-color'
import { FIELD_SIZE } from '@/consts/settings'
import { projectFigure } from '@/utils/figure'
import { createField } from '@/utils/field'
import { MoveDirection } from '@/consts/move-direction'
import { useSoundEffects } from '@/hooks/sound-effects'
import { useFiguresArray } from '@/hooks/figures-array'

export function useGameField({
  difficult,
  figureAmount,
  add,
}: {
  difficult: Ref<number>
  figureAmount: Ref<number>
  add: (score: number) => void
}) {
  const soundEffects = useSoundEffects()

  const field = shallowRef(createField(FIELD_SIZE))
  function generateField() {
    field.value = createField({ x: FIELD_SIZE.x * (1 + (figureAmount.value - 1) / 2), y: FIELD_SIZE.y })
  }
  watch(figureAmount, generateField, { immediate: true })

  const {
    figures,
    currentFigures,
    nextFigures,
    push,
    move,
    rotate,
  } = useFiguresArray({ field, figureAmount })

  const score = ref<number>(0)
  const gameOver = ref<boolean>(false)

  function stack() {
    const filtered = field.value.filter(row => row.includes(BlockColor.EMPTY))
    const delta = field.value.length - filtered.length
    if (delta > 0) {
      soundEffects.lineStackSound()
      score.value += delta ** 2
      field.value = [
        ...createField({ x: field.value[0].length, y: delta }),
        ...filtered,
      ]
    }
  }

  const delta = 10
  const initial = 2000
  const min = 200
  const offset = 10
  const speed = 0.3
  function calculateInterval(): number {
    return (initial / difficult.value - delta) / ((score.value + offset) ** speed) + min
  }

  const { pause, resume, counter } = useInterval(calculateInterval, { controls: true })

  function reset() {
    generateField()
    score.value = 0
    difficult.value = 1
    gameOver.value = false
    figures.value.forEach((figure, index) => push(index))
    resume()
  }
  tryOnMounted(reset)

  function gameOverCheck() {
    const isGameOver = !field.value[0].includes(BlockColor.EMPTY)
    if (isGameOver) {
      soundEffects.gameOverSound()
      gameOver.value = true
      add(score.value)
      pause()
    }
  }

  function cycle() {
    const available = figures.value.map(figure => figure.move(MoveDirection.DOWN))
    if (available.includes(false))
      soundEffects.figureDropSound()

    figures.value.forEach((figure, i) => {
      if (!available[i]) {
        field.value = projectFigure(field.value, figure.currentFigure.value, figure.position.value)
        push(i)
      }
    })

    stack()
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
