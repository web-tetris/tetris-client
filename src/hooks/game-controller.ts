import { onKeyStroke } from '@vueuse/core'
import { MoveDirection } from '@/consts/move-direction'

export function useGameController({
  move,
  rotate,
}: {
  move: (direction: MoveDirection) => void
  rotate: () => void
}) {
  onKeyStroke('ArrowLeft', () => {
    move(MoveDirection.LEFT)
  })

  onKeyStroke('ArrowRight', () => {
    move(MoveDirection.RIGHT)
  })

  onKeyStroke('ArrowDown', () => {
    move(MoveDirection.DOWN)
  })

  onKeyStroke('ArrowUp', () => {
    rotate()
  })
}
