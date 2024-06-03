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

  function getMovedPosition(direction: MoveDirection): Position | undefined {
    const delta = moveMap[direction]
    const newPosition = { x: position.value.x + delta.x, y: position.value.y + delta.y }
    const available = canProjectFigure(field.value, current.value, newPosition)

    return available ? newPosition : undefined
  }

  function move(direction: MoveDirection): boolean {
    const newPosition = getMovedPosition(direction)

    if (newPosition)
      position.value = newPosition

    return Boolean(newPosition)
  }

  function getRotatedFigure(): BlockMatrix {
    return rotateFigure(current.value)
  }

  function getRotatedPosition(rotated: BlockMatrix): Position | undefined {
    return getSafePosition(field.value, rotated, position.value)
  }

  function rotate(): boolean {
    const rotated = getRotatedFigure()
    const newPosition = getRotatedPosition(rotated)

    if (newPosition) {
      current.value = rotated
      position.value = newPosition
    }

    return Boolean(newPosition)
  }

  return {
    position: shallowReadonly(position),
    current: shallowReadonly(current),
    next: shallowReadonly(next),

    push,
    move,
    rotate,
    getMovedPosition,
    getRotatedFigure,
    getRotatedPosition,
  }
}
