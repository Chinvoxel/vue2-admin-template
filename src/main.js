import Vue from 'vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 枚举管理
import EnumPlugin from '@/enums'
// 状态管理器
import store from '@/store'
// 路由
import router from '@/router'
import './router/interceptor' // 拦截器
// 全局scss
import './styles/index.scss'

import App from './App.vue'

Vue.use(ElementUI)
Vue.use(EnumPlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
