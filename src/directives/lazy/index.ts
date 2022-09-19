import type { App, Directive } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const lazy: Directive = {
  mounted(el, binding) {
    const { lazy, error, load } = binding.value
    if (lazy === false) {
      el.onerror = error
      el.onload = load
      return
    }

    // 1. 拿到当前 img 标签的 src
    const imgSrc = el.src

    // 2. 把 img 标签的 src 替换为本地地址
    el.src = ''

    const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        el.src = imgSrc
        el.onerror = error
        el.onload = load
        stop()
      }
    })
  },
}

export function setupLazyDirective(app: App) {
  app.directive('lazy', lazy)
}
