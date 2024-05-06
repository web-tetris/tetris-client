import { BlockColor } from '@/consts/block-color'
import type { Position } from '@/types/position'
import type { Size } from '@/types/size'
import type { BlockMatrix } from '@/types/block-matrix'

export function fillFigure(
  figure: BlockMatrix,
): BlockMatrix {
  return figure
}

export function projectFigure(
  field: BlockMatrix,
  figure: BlockMatrix,
  position: Position,
): BlockMatrix {
  const figureSize: Size = { x: figure[0].length, y: figure.length }

  return field.map((row, y) =>
    row.map((fieldBlock, x) => {
      if (x < position.x || x >= position.x + figureSize.x)
        return fieldBlock

      if (y < position.y || y >= position.y + figureSize.y)
        return fieldBlock

      const figureBlock = figure[y - position.y][x - position.x]

      return figureBlock === BlockColor.EMPTY ? fieldBlock : figureBlock
    }),
  )
}

export function projectFiguresArray(
  field: BlockMatrix,
  figures: BlockMatrix[],
  positions: Position[],
): BlockMatrix {
  return figures.reduce((projection, figure, i) => projectFigure(projection, figure, positions[i]), field)
}

export function canProjectFigure(
  field: BlockMatrix,
  figure: BlockMatrix,
  position: Position,
): boolean {
  for (let x = position.x; x < position.x + figure[0].length; x++) {
    for (let y = position.y; y < position.y + figure.length; y++) {
      if (figure[y - position.y][x - position.x] === BlockColor.EMPTY)
        continue
      if (x < 0 || x >= field[0].length)
        return false
      if (y >= field.length)
        return false
      if (y < 0)
        continue
      if (field[y][x] !== BlockColor.EMPTY)
        return false
    }
  }
  return true
}

export function rotateFigure(
  figure: BlockMatrix,
): BlockMatrix {
  return figure.map((row, y) =>
    row.map((block, x) => {
      return figure[row.length - 1 - x][y]
    }),
  )
}

export function getSafePosition(
  field: BlockMatrix,
  figure: BlockMatrix,
  position: Position,
): Position | undefined {
  if (canProjectFigure(field, figure, position))
    return position

  if (position.x < 0) {
    for (let x = 1; x <= figure[0].length; x++) {
      const newPosition = { ...position, x: position.x + x }
      if (canProjectFigure(field, figure, newPosition))
        return newPosition
    }
  }

  if (position.x + figure[0].length >= field[0].length) {
    for (let x = 1; x <= figure[0].length; x++) {
      const newPosition = { ...position, x: position.x - x }
      if (canProjectFigure(field, figure, newPosition))
        return newPosition
    }
  }

  return undefined
}
