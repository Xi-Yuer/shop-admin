import { createApp } from 'vue'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'default-passive-events'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'nprogress/nprogress.css'
import 'virtual:windi.css'
import 'normalize.css'
import './assets/css/base.css'
import './router/permission'

import App from './App.vue'
import router from './router'
import Permission from './directives/permission'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia).use(router).use(Permission).use(ElementPlus).mount('#app')


// 注册图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
