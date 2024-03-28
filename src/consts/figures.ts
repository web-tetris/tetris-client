import { BlockColor } from '@/consts/block-color'
import type { BlockMatrix } from '@/types/block-matrix'

export const figures: BlockMatrix[] = [
  [
    [BlockColor.BLOCK_1, BlockColor.BLOCK_1],
    [BlockColor.BLOCK_1, BlockColor.BLOCK_1],
  ],
  [
    [BlockColor.EMPTY, BlockColor.EMPTY, BlockColor.EMPTY, BlockColor.EMPTY],
    [BlockColor.BLOCK_2, BlockColor.BLOCK_2, BlockColor.BLOCK_2, BlockColor.BLOCK_2],
    [BlockColor.EMPTY, BlockColor.EMPTY, BlockColor.EMPTY, BlockColor.EMPTY],
    [BlockColor.EMPTY, BlockColor.EMPTY, BlockColor.EMPTY, BlockColor.EMPTY],
  ],
  [
    [BlockColor.EMPTY, BlockColor.EMPTY, BlockColor.EMPTY],
    [BlockColor.EMPTY, BlockColor.BLOCK_3, BlockColor.BLOCK_3],
    [BlockColor.BLOCK_3, BlockColor.BLOCK_3, BlockColor.EMPTY],
  ],
  [
    [BlockColor.EMPTY, BlockColor.EMPTY, BlockColor.EMPTY],
    [BlockColor.BLOCK_4, BlockColor.BLOCK_4, BlockColor.EMPTY],
    [BlockColor.EMPTY, BlockColor.BLOCK_4, BlockColor.BLOCK_4],
  ],
  [
    [BlockColor.EMPTY, BlockColor.EMPTY, BlockColor.EMPTY],
    [BlockColor.EMPTY, BlockColor.EMPTY, BlockColor.BLOCK_5],
    [BlockColor.BLOCK_5, BlockColor.BLOCK_5, BlockColor.BLOCK_5],
  ],
  [
    [BlockColor.EMPTY, BlockColor.EMPTY, BlockColor.EMPTY],
    [BlockColor.BLOCK_6, BlockColor.EMPTY, BlockColor.EMPTY],
    [BlockColor.BLOCK_6, BlockColor.BLOCK_6, BlockColor.BLOCK_6],
  ],
  [
    [BlockColor.EMPTY, BlockColor.EMPTY, BlockColor.EMPTY],
    [BlockColor.EMPTY, BlockColor.BLOCK_7, BlockColor.EMPTY],
    [BlockColor.BLOCK_7, BlockColor.BLOCK_7, BlockColor.BLOCK_7],
  ],
]
