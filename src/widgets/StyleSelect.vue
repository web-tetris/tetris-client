<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import Select from '@/ui/Select.vue'
import type { SelectOption } from '@/types/select-option'
import { BlockStyle } from '@/consts/block-style'

const style = defineModel<BlockStyle>('style', { required: true })

const { t } = useI18n()

const styleOptions = computed <SelectOption<string>[]>(() => Object.values(BlockStyle).map(
  style => ({
    value: style,
    label: t(`style-select.${style}`),
    image: style,
  }),
))
</script>

<template>
  <Select
    v-model="style" :options="styleOptions" :label="t('style-select.title')"
  />
</template>

<style scoped lang="scss" />
