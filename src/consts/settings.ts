import { ref } from 'vue'
import type { Size } from '@/types/size'

export const CYCLE_INTERVAL = ref<number> (2000)

export const FIELD_SIZE: Size = { x: 9, y: 16 }
