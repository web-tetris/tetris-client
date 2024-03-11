import { onKeyStroke } from '@vueuse/core'
import type { Ref } from 'vue'
import { computed } from 'vue'

import { MoveDirection } from '@/consts/move-direction'
import { ControlType } from '@/consts/control-type'
import type { ControlScheme } from '@/types/control-scheme'

const schemes: Record<ControlType, ControlScheme> = {
  [ControlType.ARROWS]: {
    rotate: 'ArrowUp',
    down: 'ArrowDown',
    left: 'ArrowLeft',
    right: 'ArrowRight',
  },
  [ControlType.WASD]: {
    rotate: 'KeyW',
    down: 'KeyS',
    left: 'KeyA',
    right: 'KeyD',
  },
  [ControlType.GAMEPAD]: {
    rotate: 'KeyW',
    down: 'KeyS',
    left: 'KeyA',
    right: 'KeyD',
  },
}

export function useGameController({
  type,
  move,
  rotate,
}: {
  type: Ref<ControlType>
  move: (direction: MoveDirection) => void
  rotate: () => void
}) {
  const scheme = computed(() => schemes[type.value])

  onKeyStroke(({ code }) => code === scheme.value.left, () => move(MoveDirection.LEFT))
  onKeyStroke(({ code }) => code === scheme.value.right, () => move(MoveDirection.RIGHT))
  onKeyStroke(({ code }) => code === scheme.value.down, () => move(MoveDirection.DOWN))
  onKeyStroke(({ code }) => code === scheme.value.rotate, () => rotate())
}
