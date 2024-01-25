import { createRouter, createWebHistory } from 'vue-router'
import { createApp } from 'vue'
import App from '@/App.vue'
import { homeRoute } from '@/home/router'

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes: [
    homeRoute,
  ],
})
app.use(router)

app.mount('#app')
