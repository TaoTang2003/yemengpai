import App from './App.vue'
import store from './store'

import "@/static/style/thorui.css"
import "@/static/style/thorui-vip.css"

import "@/static/style/app.css"

import {
  createSSRApp
} from 'vue'

export function createApp() {
  const app = createSSRApp(App)
  return {
    store,
    app
  }
}
