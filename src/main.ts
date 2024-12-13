import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import pinia from './stores'

const app = createApp(App)

app.use(Antd)
app.use(router)
app.use(pinia)

app.mount('#app')
