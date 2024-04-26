import { createGlobalState, useCssVar } from '@vueuse/core'
import randomColor from 'randomcolor'
import { computed, toRefs, watch } from 'vue'

import { BlockStyle } from '@/consts/block-style'
import { useSettingsStore } from '@/stores/settings'

const styleColorMapping: Record<BlockStyle, string[]> = {
  [BlockStyle.MAIN]: randomColor({ luminosity: 'light', count: 3 }),
  [BlockStyle.CASINO]: ['#FFCF00', '#7DD63E', '#48E1FF'],
  [BlockStyle.FOOD]: ['#FFDA00', '#FF9FC4', '#CCD830'],
  [BlockStyle.POKEMON]: ['#EA81BD', '#E86207', '#A962E8'],
  [BlockStyle.CAMPING]: ['#FFAB46', '#4B81F2', '#9DC600'],
  [BlockStyle.CAT]: ['#F7B3A0', '#FDE37E', '#FE91C7'],
}

export const useColors = createGlobalState(() => {
  const { blockStyle } = toRefs(useSettingsStore())

  const primary0 = useCssVar('--primary-0')
  const primary1 = useCssVar('--primary-1')
  const primary2 = useCssVar('--primary-2')

  const colors = computed(() => styleColorMapping[blockStyle.value])

  function changeColors() {
    primary0.value = colors.value[0]
    primary1.value = colors.value[1]
    primary2.value = colors.value[2]
  }
  watch(blockStyle, changeColors, { immediate: true })
})
