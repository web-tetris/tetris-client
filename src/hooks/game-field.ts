import type { Ref } from 'vue'
import { computed, onMounted, ref, shallowReadonly, shallowRef, watch } from 'vue'

import { useInterval } from '@vueuse/core'
import { BlockColor } from '@/consts/block-color'
import { FIELD_SIZE } from '@/consts/settings'
import { projectFigure } from '@/utils/figure'
import { createField } from '@/utils/field'
import type { FigureService } from '@/hooks/figure'
import { useFigure } from '@/hooks/figure'
import { MoveDirection } from '@/consts/move-direction'

export function useGameField({
  difficult,
  figureAmount,
  add,
}: {
  difficult: Ref<number>
  figureAmount: Ref<number>
  add: (score: number) => void
}) {
  const field = shallowRef(createField(FIELD_SIZE))
  function generateField() {
    field.value = createField({ x: FIELD_SIZE.x * (1 + (figureAmount.value - 1) / 2), y: FIELD_SIZE.y })
  }
  watch(figureAmount, generateField, { immediate: true })

  const figures = shallowRef<FigureService[]>([])
  function generateFigures() {
    figures.value = Array.from({ length: figureAmount.value }, () => useFigure(field))
  }
  watch(figureAmount, generateFigures, { immediate: true })

  const currentFigures = computed(() => figures.value.map(figure => figure.currentFigure))
  const nextFigures = computed (() => figures.value.map(figure => figure.nextFigure))
  function rotate(index: number) {
    figures.value[index].rotate()
  }
  function move(index: number, direction: MoveDirection) {
    figures.value[index].move(direction)
  }
  function push() {
    figures.value.forEach((figure, index) => {
      figure.push((1 / (figureAmount.value + 1)) * (index + 1))
    })
  }
  onMounted(push)

  const score = ref<number>(0)
  const gameOver = ref<boolean>(false)

  function stack() {
    const filtered = field.value.filter(row => row.includes(BlockColor.EMPTY))
    const delta = field.value.length - filtered.length
    if (delta > 0) {
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
    push()
    resume()
  }

  function gameOverCheck() {
    const isGameOver = !field.value[0].includes(BlockColor.EMPTY)
    if (isGameOver) {
      gameOver.value = true
      add(score.value)
      pause()
    }
  }

  function cycle() {
    const available = figures.value.map(figure => figure.move(MoveDirection.DOWN))

    figures.value.forEach((figure, i) => {
      if (!available[i]) {
        field.value = projectFigure(field.value, figure.currentFigure.value, figure.position.value)
        figure.push((1 / (figureAmount.value + 1)) * (i + 1))
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
