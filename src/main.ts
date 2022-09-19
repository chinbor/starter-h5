import { createApp } from 'vue'
// Register icon sprite
import 'virtual:svg-icons-register'
// import styles
import '~/styles/index'
import App from './App.vue'
import { router, setupRouter } from '~/router/index'
import { setupRouterGuard } from '~/router/guard/index'
import { initState, setupStore } from '~/stores/index'
import { setupGlobDirectives } from '~/directives/index'
import { tracker } from '~/utils/tracker'

function bootStrap() {
  const app = createApp(App)

  // 埋点 sdk初始化
  tracker.init()

  // 注册全局指令
  setupGlobDirectives(app)

  // 安装路由守卫
  setupRouterGuard(router)

  // 安装路由
  setupRouter(app)

  // 安装 store
  setupStore(app)

  // 初始化pinia的state值
  initState()

  app.mount('#app')
}

bootStrap()
