import { config } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

config.global.plugins = [[createI18n({ allowComposition: true })], [createPinia()]]
