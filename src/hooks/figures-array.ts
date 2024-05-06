import type { Ref } from 'vue'
import { computed, shallowReadonly, shallowRef, watch } from 'vue'
import { useFigure } from '@/hooks/figure'
import type { BlockMatrix } from '@/types/block-matrix'
import type { MoveDirection } from '@/consts/move-direction'
import {
  canProjectFigure,
  projectFiguresArray,
} from '@/utils/figure'

export function useFiguresArray({
  field,
  figureAmount,
}: {
  field: Ref<BlockMatrix>
  figureAmount: Ref<number>
}) {
  const figures = shallowRef<ReturnType<typeof useFigure>[]>([])

  function generateFigures() {
    figures.value = Array.from({ length: figureAmount.value }, () => useFigure(field))
  }
  watch(figureAmount, generateFigures, { immediate: true })

  const current = computed(() => figures.value.map(figure => figure.current.value))
  const next = computed (() => figures.value.map(figure => figure.next.value))
  const position = computed (() => figures.value.map(figure => figure.position.value))

  function projectOthers(index: number): BlockMatrix {
    const others = figures.value.toSpliced(index, 1)

    return projectFiguresArray(
      field.value,
      others.map(figure => figure.current.value),
      others.map(figure => figure.position.value),
    )
  }

  function rotate(index: number): boolean {
    const projection = projectOthers(index)

    const { getRotatedPosition, getRotatedFigure } = figures.value[index]
    const rotated = getRotatedFigure()
    const newPosition = getRotatedPosition(rotated)

    if (!newPosition)
      return false

    return canProjectFigure(projection, rotated, newPosition)
      ? figures.value[index].rotate()
      : false
  }

  function move(index: number, direction: MoveDirection): boolean {
    const projection = projectOthers(index)

    const { current, getMovedPosition } = figures.value[index]
    const newPosition = getMovedPosition(direction)

    if (!newPosition)
      return false

    return canProjectFigure(projection, current.value, newPosition)
      ? figures.value[index].move(direction)
      : false
  }

  function push(index: number) {
    figures.value[index].push((1 / (figureAmount.value + 1)) * (index + 1))
  }

  return {
    current: shallowReadonly(current),
    next: shallowReadonly(next),
    position: shallowReadonly(position),

    rotate,
    move,
    push,
  }
}
