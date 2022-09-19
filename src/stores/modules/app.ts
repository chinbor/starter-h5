import { store } from '~/stores/index'
import { getDeltaTime } from '~/utils/index'
interface AppState {
  cachedPages: string[]
  deltaTime: number
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => {
    return {
      cachedPages: [],
      deltaTime: 0,
    }
  },
  getters: {
    getCachedPages(): string[] {
      return this.cachedPages
    },
  },
  actions: {
    pushPage(name: string): void {
      if (this.cachedPages.includes(name))
        return

      this.cachedPages.push(name)
    },

    async updateDeltaTime() {
      const deltaTime = await getDeltaTime()

      this.deltaTime = deltaTime
    },
  },
})

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store)
}
