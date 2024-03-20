<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { syncRef } from '@vueuse/core'
import type { SelectOption } from '@/types/select-option'
import Select from '@/ui/Select.vue'

const languageOptions: SelectOption<string>[] = [
  { label: 'en', value: 'en' },
  { label: 'ru', value: 'ru' },
]
const currentLanguage = ref<string>('en')

const { t, locale } = useI18n({ useScope: 'global' })
syncRef(currentLanguage, locale)
</script>

<template>
  <div>
    <Select
      v-model="currentLanguage"
      class="language"
      :options="languageOptions"
      :label="t('language-select.lang')"
    />
  </div>
</template>

<style scoped lang="scss">

</style>
