import type { Ref } from 'vue'
import { computed, shallowReadonly, shallowRef, watch } from 'vue'
import { useFigure } from '@/hooks/figure'
import type { BlockMatrix } from '@/types/block-matrix'
import type { MoveDirection } from '@/consts/move-direction'

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

  const currentFigures = computed(() => figures.value.map(figure => figure.currentFigure))
  const nextFigures = computed (() => figures.value.map(figure => figure.nextFigure))

  function rotate(index: number) {
    figures.value[index].rotate()
  }

  function move(index: number, direction: MoveDirection) {
    figures.value[index].move(direction)
  }

  function push(index: number) {
    figures.value[index].push((1 / (figureAmount.value + 1)) * (index + 1))
  }

  return {
    figures: shallowReadonly(figures),
    currentFigures: shallowReadonly(currentFigures),
    nextFigures: shallowReadonly(nextFigures),

    rotate,
    move,
    push,
  }
}
