import type { MaybeRefOrGetter } from 'vue'
import { toValue } from 'vue'
import {
  useIntervalFn,
  usePointerSwipe,
  useTimeoutFn,
  whenever,
} from '@vueuse/core'

export const useGestures = (target: MaybeRefOrGetter<HTMLElement>) => {
  const { isSwiping, direction } = usePointerSwipe(target, { threshold: 30 })

  function onKeyDown(key: MaybeRefOrGetter<string>, cb: () => unknown): void {
    whenever(() => isSwiping.value && direction.value === toValue(key), cb, { immediate: false })
  }

  function onKeyUp(key: MaybeRefOrGetter<string>, cb: () => unknown): void {
    whenever(() => !isSwiping.value || direction.value !== toValue(key), cb, { immediate: false })
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
}
