import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "element-plus/theme-chalk/src/message.scss";

// elementui plus icon import
// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'virtual:uno.css'
const app = createApp(App)
app.use(router)
Object.entries(ElementPlusIconsVue).forEach(([key, component]) => {
  app.component(key, component)
})
app.mount('#app')
