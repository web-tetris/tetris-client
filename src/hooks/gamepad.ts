import type { MaybeRefOrGetter } from 'vue'
import { shallowRef, toValue } from 'vue'
import {
  useEventListener,
  useIntervalFn, useTimeoutFn,
  whenever,
} from '@vueuse/core'

const mapping = {
  0: 'A',
  1: 'B',
  2: 'X',
  3: 'Y',
  12: 'Up',
  14: 'Left',
  13: 'Down',
  15: 'Right',
} as const

export type ButtonMap = Record<(typeof mapping)[keyof typeof mapping], boolean>

export function useGamepad() {
  const gamepads = shallowRef<Gamepad[]>([])

  function onConnect(event: GamepadEvent) {
    const newGamepad = navigator.getGamepads()[event.gamepad.index]!
    gamepads.value = [...gamepads.value, newGamepad]
  }
  useEventListener('gamepadconnected', onConnect)

  function onDisconnect() {
    gamepads.value = gamepads.value.filter(gamepad => gamepad.id !== gamepads.value[0].id)
  }
  useEventListener('gamepaddisconnected', onDisconnect)

  function getButtonMap(snapshot: Gamepad): ButtonMap {
    // @ts-expect-error: _
    return snapshot.buttons.reduce((acc, { pressed }, index) => ({ ...acc, [mapping[index]]: pressed }), {})
  }

  const buttons = shallowRef<ButtonMap[]>([])
  useIntervalFn(() => {
    buttons.value = gamepads.value
      .map(({ index }) => navigator.getGamepads()[index]!)
      .map(getButtonMap)
  }, 10)

  function onKeyDown(key: MaybeRefOrGetter<keyof ButtonMap>, index: MaybeRefOrGetter<number>, cb: () => unknown): void {
    whenever(() => buttons.value[toValue(index)]?.[toValue(key)], cb, { immediate: false })
  }

  function onKeyUp(key: MaybeRefOrGetter<keyof ButtonMap>, index: MaybeRefOrGetter<number>, cb: () => unknown): void {
    whenever(() => !buttons.value[toValue(index)]?.[toValue(key)], cb, { immediate: false })
  }

  function onKeyStroke(key: MaybeRefOrGetter<keyof ButtonMap>, index: MaybeRefOrGetter<number>, cb: () => unknown): void {
    const turbo = useIntervalFn(cb, 100, { immediate: false })
    const wait = useTimeoutFn(() => turbo.resume(), 100, { immediate: false })

    onKeyUp(key, index, () => {
      turbo.pause()
      wait.stop()
    })

    onKeyDown(key, index, () => {
      cb()
      wait.start()
    })
  }

  return {
    gamepads,
    buttons,

    onKeyDown,
    onKeyUp,
    onKeyStroke,
  }
}
