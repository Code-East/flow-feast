import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './route'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import 'amfe-flexible';

const store = createPinia();
const app = createApp(App)
//注册所有icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router).use(store).mount('#app')
