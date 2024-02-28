import { useInterval } from '@vueuse/core'
import { CYCLE_INTERVAL } from '@/consts/settings'

export function useGameLife() {
  const { counter, reset, pause, resume } = useInterval(CYCLE_INTERVAL, { controls: true })

  return {
    counter,
    reset,
    pause,
    resume,
  }
}
