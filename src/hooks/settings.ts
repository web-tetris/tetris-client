import { computed, ref, shallowReadonly } from 'vue'

export function useSettingsService() {
  const difficult = ref<number>(1)
  const interval = computed(() => 2000 / difficult.value)

  return {
    difficult,

    interval: shallowReadonly(interval),
  }
}
