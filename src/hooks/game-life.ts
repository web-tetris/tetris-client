import { useInterval } from '@vueuse/core'
import type { Ref } from 'vue'

export function useGameLife({
  interval,
}: { interval: Ref<number> }) {
  const { counter, reset, pause, resume } = useInterval(interval, { controls: true })

  return {
    counter,
    reset,
    pause,
    resume,
  }
}
