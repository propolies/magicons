import Icon from './icon.svelte'
import type { Icons } from './types.js'

declare global {
  // eslint-disable-next-line no-var
  var test: typeof globalThis.HeroIcons
    // eslint-disable-next-line no-var
  var test2: number
}

export { Icon, type Icons }
