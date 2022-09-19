import type { App } from 'vue'
import { setupWavesDirective } from './waves'
import { setupLazyDirective } from './lazy'

export function setupGlobDirectives(app: App) {
  setupWavesDirective(app)
  setupLazyDirective(app)
}
