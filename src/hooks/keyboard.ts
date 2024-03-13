import {
  createSharedComposable,
  useEventListener,
  useIntervalFn, useTimeoutFn,
} from '@vueuse/core'
import type { MaybeRefOrGetter } from 'vue'
import { toValue } from 'vue'

export const useKeyboard = createSharedComposable(() => {
  function onKeyDown(key: MaybeRefOrGetter<string>, cb: () => unknown): void {
    useEventListener('keydown', ({ code }) => code === toValue(key) && cb())
  }

  function onKeyUp(key: MaybeRefOrGetter<string>, cb: () => unknown): void {
    useEventListener('keyup', ({ code }) => code === toValue(key) && cb())
  }

  function onKeyStroke(key: MaybeRefOrGetter<string>, cb: () => unknown): void {
    const turbo = useIntervalFn(cb, 100, { immediate: false })
    const wait = useTimeoutFn(() => turbo.resume(), 100, { immediate: false })

    onKeyUp(key, () => {
      turbo.pause()
      wait.stop()
    })

    onKeyDown(key, () => {
      cb()
      wait.start()
    })
  }

  return {

    onKeyDown,
    onKeyUp,
    onKeyStroke,
  }
})
