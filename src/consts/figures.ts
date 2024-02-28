import { BlockColor } from '@/consts/block-color'
import type { BlockMatrix } from '@/types/block-matrix'

export const figures: BlockMatrix[] = [
  [
    [BlockColor.GOLD, BlockColor.GOLD],
    [BlockColor.GOLD, BlockColor.GOLD],
  ],
  [
    [BlockColor.EMPTY, BlockColor.EMPTY, BlockColor.EMPTY, BlockColor.EMPTY],
    [BlockColor.LILAC, BlockColor.LILAC, BlockColor.LILAC, BlockColor.LILAC],
    [BlockColor.EMPTY, BlockColor.EMPTY, BlockColor.EMPTY, BlockColor.EMPTY],
    [BlockColor.EMPTY, BlockColor.EMPTY, BlockColor.EMPTY, BlockColor.EMPTY],
  ],
  [
    [BlockColor.EMPTY, BlockColor.EMPTY, BlockColor.EMPTY],
    [BlockColor.EMPTY, BlockColor.PARADISE, BlockColor.PARADISE],
    [BlockColor.PARADISE, BlockColor.PARADISE, BlockColor.EMPTY],
  ],
  [
    [BlockColor.EMPTY, BlockColor.EMPTY, BlockColor.EMPTY],
    [BlockColor.PEPPER, BlockColor.PEPPER, BlockColor.EMPTY],
    [BlockColor.EMPTY, BlockColor.PEPPER, BlockColor.PEPPER],
  ],
  [
    [BlockColor.EMPTY, BlockColor.EMPTY, BlockColor.EMPTY],
    [BlockColor.EMPTY, BlockColor.EMPTY, BlockColor.FRENCHBLUE],
    [BlockColor.FRENCHBLUE, BlockColor.FRENCHBLUE, BlockColor.FRENCHBLUE],
  ],
  [
    [BlockColor.EMPTY, BlockColor.EMPTY, BlockColor.EMPTY],
    [BlockColor.PINK, BlockColor.EMPTY, BlockColor.EMPTY],
    [BlockColor.PINK, BlockColor.PINK, BlockColor.PINK],
  ],
  [
    [BlockColor.EMPTY, BlockColor.EMPTY, BlockColor.EMPTY],
    [BlockColor.EMPTY, BlockColor.CORAL, BlockColor.EMPTY],
    [BlockColor.CORAL, BlockColor.CORAL, BlockColor.CORAL],
  ],
]
