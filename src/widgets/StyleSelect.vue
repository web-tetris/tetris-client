<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import Select from '@/ui/Select.vue'
import type { SelectOption } from '@/types/select-option'
import { BlockStyle } from '@/consts/block-style'
import { useSettingsStore } from '@/stores/settings'

const { blockStyle } = storeToRefs(useSettingsStore())

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
    v-model="blockStyle"
    :options="styleOptions"
    :label="t('style-select.title')"
  />
</template>

<style scoped lang="scss" />
