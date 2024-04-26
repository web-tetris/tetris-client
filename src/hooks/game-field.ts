import type { Ref } from 'vue'
import { shallowReadonly, shallowRef, watch } from 'vue'
import { createField } from '@/utils/field'
import { FIELD_SIZE } from '@/consts/settings'
import { BlockColor } from '@/consts/block-color'
import { useSoundStore } from '@/stores/sound'
import type { BlockMatrix } from '@/types/block-matrix'
import { projectFigure } from '@/utils/figure'

export function useGameField({
  figureAmount,
}: {
  figureAmount: Ref<number>
}) {
  const field = shallowRef(createField(FIELD_SIZE))
  function generateField() {
    field.value = createField({ x: FIELD_SIZE.x * (1 + (figureAmount.value - 1) / 2), y: FIELD_SIZE.y })
  }
  watch(figureAmount, generateField, { immediate: true })

  function addFigure(currentFigure: BlockMatrix, position: { x: number; y: number }) {
    field.value = projectFigure(field.value, currentFigure, position)
  }

  const { lineStackSound } = useSoundStore()
  function stackLines(): number {
    const filtered = field.value.filter(row => row.includes(BlockColor.EMPTY))
    const delta = field.value.length - filtered.length
    if (delta > 0) {
      lineStackSound()
      field.value = [
        ...createField({ x: field.value[0].length, y: delta }),
        ...filtered,
      ]
    }
    return delta
  }

  return {
    field: shallowReadonly(field),

    generateField,
    addFigure,
    stackLines,
  }
}
