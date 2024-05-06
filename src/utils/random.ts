export function randomInt(value: number): number {
  return Math.floor(Math.random() * value)
}

export function randomArrayValue<T>(array: T[]): T {
  return array[randomInt(array.length)]
}

export function randomEnumValue<T>(enumeration: Record<string, T>): T {
  return randomArrayValue(Object.values(enumeration))
}
