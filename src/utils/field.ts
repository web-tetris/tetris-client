import type { Size } from '@/types/size'
import { BlockColor } from '@/consts/block-color'
import type { BlockMatrix } from '@/types/block-matrix'

export function createField(
  size: Size,
): BlockMatrix {
  return Array.from({ length: size.y }, () =>
    Array.from({ length: size.x }, () =>
      BlockColor.EMPTY,
    ),
  )
}
