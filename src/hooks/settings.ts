import { ref } from 'vue'

export function useSettingsService() {
  const difficult = ref<number>(1)

  return {
    difficult,
  }
}
