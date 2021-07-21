import { createApp } from 'vue'
import router from './router'
import store from './store'
import axios from 'axios'
import App from './App.vue'

axios.defaults.baseURL = 'api.vikingship.xyz/'

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
