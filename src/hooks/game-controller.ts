import type { Ref } from 'vue'
import { computed } from 'vue'

import { MoveDirection } from '@/consts/move-direction'
import { ControlType } from '@/consts/control-type'
import type { ControlScheme } from '@/types/control-scheme'
import type { ButtonMap } from '@/hooks/gamepad'
import { useGamepad } from '@/hooks/gamepad'
import { schemes } from '@/consts/control-schemes'
import { useKeyboard } from '@/hooks/keyboard'

export function useGameController({
  type,
  move,
  rotate,
  index,
  toggleMenu,
  reset,
}: {
  type: Ref<ControlType>
  rotate: () => void
  move: (direction: MoveDirection) => void
  toggleMenu: () => unknown
  reset: () => unknown
  index: Ref<number>
}) {
  const scheme = computed(() => schemes[type.value])

  const actions: Record<keyof ControlScheme, () => unknown> = {
    up: () => rotate(),
    down: () => move(MoveDirection.DOWN),
    left: () => move(MoveDirection.LEFT),
    right: () => move(MoveDirection.RIGHT),
  }

  const gamepad = useGamepad()
  const keyboard = useKeyboard()

  for (const key of Object.keys(actions) as (keyof ControlScheme)[]) {
    keyboard.onKeyStroke(
      () => scheme.value[key],
      () => (type.value !== ControlType.GAMEPAD) && actions[key](),
    )

    gamepad.onKeyStroke(
      () => scheme.value[key] as keyof ButtonMap,
      index,
      () => (type.value === ControlType.GAMEPAD) && actions[key](),
    )
  }

  gamepad.onKeyUp('Back', index, reset)
  gamepad.onKeyUp('Start', index, toggleMenu)
  keyboard.onKeyUp('KeyR', reset)
  keyboard.onKeyUp('KeyM', toggleMenu)
}
