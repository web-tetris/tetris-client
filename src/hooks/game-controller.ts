import { onKeyStroke } from '@vueuse/core'
import type { Ref } from 'vue'
import { computed } from 'vue'

import { MoveDirection } from '@/consts/move-direction'
import { ControlType } from '@/consts/control-type'
import type { ControlScheme } from '@/types/control-scheme'
import type { ButtonMap } from '@/hooks/gamepad'
import { useGamepad } from '@/hooks/gamepad'

const schemes: Record<ControlType, ControlScheme> = {
  [ControlType.ARROWS]: {
    up: 'ArrowUp',
    down: 'ArrowDown',
    left: 'ArrowLeft',
    right: 'ArrowRight',
  },
  [ControlType.WASD]: {
    up: 'KeyW',
    down: 'KeyS',
    left: 'KeyA',
    right: 'KeyD',
  },
  [ControlType.GAMEPAD]: {
    up: 'Y',
    down: 'A',
    left: 'X',
    right: 'B',
  },
}

export function useGameController({
  type,
  move,
  rotate,
  index,
}: {
  type: Ref<ControlType>
  move: (direction: MoveDirection) => void
  rotate: () => void
  index: Ref<number>
}) {
  const scheme = computed(() => schemes[type.value])

  const keyboardActions: Record<keyof ControlScheme, () => unknown> = {
    up: () => rotate(),
    down: () => move(MoveDirection.DOWN),
    left: () => move(MoveDirection.LEFT),
    right: () => move(MoveDirection.RIGHT),
  }
  for (const key of Object.keys(keyboardActions) as (keyof ControlScheme)[]) {
    onKeyStroke(({ code }) => code === scheme.value[key], () => {
      if (type.value !== ControlType.GAMEPAD)
        keyboardActions[key]()
    })
  }

  const gamepad = useGamepad()
  const gamepadActions: Partial<Record<keyof ButtonMap, () => unknown>> = {
    Up: () => rotate(),
    Down: () => move(MoveDirection.DOWN),
    Left: () => move(MoveDirection.LEFT),
    Right: () => move(MoveDirection.RIGHT),
  }
  for (const key of Object.keys(gamepadActions) as (keyof ButtonMap)[]) {
    gamepad.onKeyStroke(key, index, () => {
      if (type.value === ControlType.GAMEPAD && gamepadActions[key])
        gamepadActions[key]!()
    })
  }
}
