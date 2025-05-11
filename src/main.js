import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Material Design Icons
import '@mdi/font/css/materialdesignicons.css'

// Create app instance
const app = createApp(App)

// Set up Vuetify
const vuetify = createVuetify({
  components,
  directives,
})

// Set up Pinia
const pinia = createPinia()
app.use(pinia)

// Use router and Vuetify
app.use(router)
app.use(vuetify)

// Mount the app
app.mount('#app')

// ✅ AFTER mounting the app, you can now access stores
import { useColorsStore } from './stores/colors'
const colorStore = useColorsStore()

// Optional: make the store available globally (if really needed)
app.config.globalProperties.$colorStore = colorStore
