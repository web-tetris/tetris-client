import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia'
import { createMemoryHistory, createRouter } from 'vue-router'
import App from '@/App.vue'
import ru from '@/locale/ru.json'
import en from '@/locale/en.json'
import GamePage from '@/pages/GamePage.vue'
import SettingsPage from '@/pages/SettingsPage.vue'

const app = createApp(App)

const i18n = createI18n({
  locale: 'en',
  allowComposition: true,
  messages: { ru, en },
})
app.use(i18n)

const routes = [
  { path: '/', component: SettingsPage },
  { path: '/game', component: GamePage },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
app.use(router)

app.use(createPinia())
app.mount('#app')
