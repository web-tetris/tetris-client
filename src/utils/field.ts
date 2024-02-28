import type { Size } from '@/types/size'
import { BlockColor } from '@/consts/block-color'
import type { BlockMatrix } from '@/types/block-matrix'

export function createField(
  size: Size,
): BlockMatrix {
  return Array.from({ length: size.y }, (_, yIndex) =>
    Array.from({ length: size.x }, (_, xIndex) => {
      return BlockColor.EMPTY
    }),
  )
}
