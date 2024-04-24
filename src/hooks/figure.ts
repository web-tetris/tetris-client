import type { Ref } from 'vue'
import { ref, shallowReadonly, shallowRef } from 'vue'
import type { Position } from '@/types/position'
import type { BlockMatrix } from '@/types/block-matrix'
import {
  canProjectFigure,
  fillFigure,
  getSafePosition,
  rotateFigure,
} from '@/utils/figure'
import { randomArrayValue } from '@/utils/random'
import { figures } from '@/consts/figures'
import { MoveDirection } from '@/consts/move-direction'

export function useFigure(field: Ref<BlockMatrix>) {
  const position = ref<Position>({ x: 0, y: 0 })
  const current = shallowRef<BlockMatrix>([[]])
  const next = shallowRef<BlockMatrix>(fillFigure(randomArrayValue(figures)))

  function push(xRelative: number) {
    current.value = next.value
    next.value = fillFigure(randomArrayValue(figures))
    position.value = {
      x: Math.round(field.value[0].length * xRelative - current.value[0].length / 2),
      y: -current.value.length,
    }
  }

  const moveMap: Record<MoveDirection, Position> = {
    [MoveDirection.LEFT]: { x: -1, y: 0 },
    [MoveDirection.RIGHT]: { x: 1, y: 0 },
    [MoveDirection.DOWN]: { x: 0, y: 1 },
  }
  function move(direction: MoveDirection) {
    const delta = moveMap[direction]
    const newPosition: Position = { x: position.value.x + delta.x, y: position.value.y + delta.y }
    const available = canProjectFigure(field.value, current.value, newPosition)

    if (available)
      position.value = newPosition

    return available
  }

  function rotate() {
    const rotated = rotateFigure(current.value)
    const newPosition = getSafePosition(field.value, rotated, position.value)
    if (newPosition) {
      current.value = rotated
      position.value = newPosition
    }
  }

  return {
    position: shallowReadonly(position),
    current: shallowReadonly(current),
    next: shallowReadonly(next),

    push,
    move,
    rotate,
  }
}
