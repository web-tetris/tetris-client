import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from '@/App.vue'
import ru from '@/locale/ru.json'
import en from '@/locale/en.json'

const app = createApp(App)

const i18n = createI18n({
  locale: 'en',
  allowComposition: true,
  messages: { ru, en },
})

app.use(i18n)
app.mount('#app')
