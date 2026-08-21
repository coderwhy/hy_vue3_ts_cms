import { createApp } from 'vue'
import router from './router'
import store from './store'
import useLoginStore from './store/login/login'
import 'normalize.css'

import './assets/css/index.less'
import App from './App.vue'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(store)
app.use(router)

const loginStore = useLoginStore()

async function bootstrapApp() {
  try {
    await loginStore.loadLocalDataAction()
  } catch {
    loginStore.logoutAction()
  }

  await router.isReady()
  app.mount('#app')
}

void bootstrapApp()
