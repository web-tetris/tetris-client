export interface SelectOption<V extends number | string = number> {
  label: string
  value: V
  icon?: string
}
