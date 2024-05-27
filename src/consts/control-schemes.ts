import { ControlType } from '@/consts/control-type'
import type { ControlScheme } from '@/types/control-scheme'

export const schemes: Record<ControlType, ControlScheme> = {
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
    up: 'Up',
    down: 'Down',
    left: 'Left',
    right: 'Right',
  },
  [ControlType.GESTURES]: {
    up: 'up',
    down: 'down',
    left: 'left',
    right: 'right',
  },
}
