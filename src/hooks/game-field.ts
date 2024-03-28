import type { Ref } from 'vue'
import { computed, ref, shallowReadonly, shallowRef, watch } from 'vue'
import { tryOnMounted, useInterval } from '@vueuse/core'
import { BlockColor } from '@/consts/block-color'
import { FIELD_SIZE } from '@/consts/settings'
import type { Position } from '@/types/position'
import { MoveDirection } from '@/consts/move-direction'
import {
  canProjectFigure,
  fillFigure,
  getSafePosition,
  projectFigure,
  rotateFigure,
} from '@/utils/figure'
import { figures } from '@/consts/figures'
import { randomArrayValue } from '@/utils/random'
import { createField } from '@/utils/field'
import type { BlockMatrix } from '@/types/block-matrix'

export function useGameField({
  difficult,
  add,
}: {
  difficult: Ref<number>
  add: (score: number) => void
}) {
  const field = shallowRef(createField(FIELD_SIZE))

  const pos = ref<Position>({ x: 0, y: 0 })
  const currentFigure = shallowRef<BlockMatrix>([[]])
  const nextFigure = shallowRef<BlockMatrix>(fillFigure(randomArrayValue(figures)))
  const score = ref<number>(0)
  const gameOver = ref<boolean>(false)

  function push() {
    currentFigure.value = nextFigure.value
    nextFigure.value = fillFigure(randomArrayValue(figures))
    pos.value = { x: Math.floor(FIELD_SIZE.x / 2) - Math.floor(currentFigure.value[0].length / 2), y: -currentFigure.value.length + 1 }
  }
  tryOnMounted(push)

  const moveMap: Record<MoveDirection, Position> = {
    [MoveDirection.LEFT]: { x: -1, y: 0 },
    [MoveDirection.RIGHT]: { x: 1, y: 0 },
    [MoveDirection.DOWN]: { x: 0, y: 1 },
  }
  function move(direction: MoveDirection) {
    const delta = moveMap[direction]
    const position: Position = { x: pos.value.x + delta.x, y: pos.value.y + delta.y }
    if (canProjectFigure(field.value, currentFigure.value, position))
      pos.value = position
  }

  function rotate() {
    const rotated = rotateFigure(currentFigure.value)
    const position = getSafePosition(field.value, rotated, pos.value)
    if (position) {
      currentFigure.value = rotated
      pos.value = position
    }
  }

  function stack() {
    const filtered = field.value.filter(row => row.includes(BlockColor.EMPTY))
    const delta = field.value.length - filtered.length
    if (delta > 0) {
      score.value += delta ** 2
      field.value = [
        ...createField({ x: FIELD_SIZE.x, y: delta }),
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
    field.value = createField(FIELD_SIZE)
    score.value = 0
    difficult.value = 1
    gameOver.value = false
    push()
    resume()
  }

  function gameOverCheck() {
    const isGameOver = field.value[0]
      .slice(pos.value.x, pos.value.x + currentFigure.value[0].length)
      .some(row => row !== BlockColor.EMPTY)
    if (isGameOver) {
      gameOver.value = true
      add(score.value)
      pause()
    }
  }

  function cycle() {
    const position: Position = { x: pos.value.x, y: pos.value.y + 1 }
    if (canProjectFigure(field.value, currentFigure.value, position)) {
      pos.value = position
    }
    else {
      field.value = projectFigure(field.value, currentFigure.value, pos.value)
      gameOverCheck()
      push()
    }

    stack()
  }
  watch(counter, cycle)

  const matrix = computed(() => projectFigure(field.value, currentFigure.value, pos.value))

  return {
    matrix,
    currentFigure: shallowReadonly(currentFigure),
    nextFigure: shallowReadonly(nextFigure),
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
