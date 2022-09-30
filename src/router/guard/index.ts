import type { Router } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useAppStoreWithOut } from '~/stores/modules/app'

NProgress.configure({ showSpinner: false })

function createProgressGuard(router: Router) {
  router.beforeEach((to) => {
    NProgress.start()

    document.title = to.meta.title ? `${to.meta.title} - 三国灵境艺术馆` : '三国灵境艺术馆'
  })

  router.afterEach(() => {
    NProgress.done()
  })
}

function createCachedPageGuard(router: Router) {
  // NOTE: 宣告失败，不知道怎么解决
  // a -> b a缓存，b不缓存
  // b -> c b缓存，c不缓存
  // b -> a b不缓存
  router.beforeEach((to) => {
    const appStore = useAppStoreWithOut()

    if (to.meta.keepAlive)
      appStore.pushPage(to.name as string)
  })
}

export function setupRouterGuard(router: Router) {
  createProgressGuard(router)
  createCachedPageGuard(router)
}
