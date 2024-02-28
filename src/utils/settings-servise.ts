import { ref, watch } from 'vue'
import { CYCLE_INTERVAL } from '@/consts/settings'

export function useSettingsService() {
  const difficult = ref<number>(1)
  console.log(CYCLE_INTERVAL.value)

  watch(difficult, () => {
    CYCLE_INTERVAL.value = 2000 / difficult.value
    console.log(CYCLE_INTERVAL.value)
  })

  return {
    difficult,
    CYCLE_INTERVAL,
  }
}
