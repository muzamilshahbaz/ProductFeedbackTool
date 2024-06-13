import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Router from './routes'
import Store from './store'

const app = createApp(App)

app.use(Router)
app.use(Store)
app.mount('#app')