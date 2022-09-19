import type { App } from 'vue'
import { createPinia } from 'pinia'
import { useAppStoreWithOut } from './modules/app'

const store = createPinia()

export function setupStore(app: App<Element>) {
  app.use(store)
}

export function initState() {
  const appStore = useAppStoreWithOut()

  appStore.updateDeltaTime()
}

export { store }
