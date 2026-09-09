import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import { useTheme } from '@/composables/useTheme'

const { initializeTheme } = useTheme()

initializeTheme()

createApp(App)
  .use(router)
  .mount('#app')