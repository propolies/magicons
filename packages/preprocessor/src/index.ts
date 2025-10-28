import MagicString from 'magic-string'
import { providers } from '@magicons/shared'
import type { PluginOption } from 'vite'

const providerRegex = new RegExp(`"@(${providers.join('|')})-(\\S*)"`, 'g')

function addMatch(matches: Record<string, [string, string]>, match: [string, string]) {
  const key = match.join('.')
  if (matches[key]) return
  matches[key] = match
}

function replaceAll(s: MagicString, ...rest: Parameters<MagicString['replaceAll']>) {
  return new MagicString(s.replaceAll(...rest).toString())
}

export function magicons() {
  return {
    enforce: 'pre',
    name: 's preprocessor',
    transform: (code: string, id: string) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [file, ext] = id.split('/').at(-1)!.split('.').slice(-2)
      if (id.includes('node_modules')) return
      if (!id.includes('src')) return
      if (!['ts', 'js', 'svelte', 'tsx', 'jsx', 'mdx'].includes(ext)) return

      const matches: Record<string, [string, string]> = {}

      let s = new MagicString(code, { filename: id })

      s = replaceAll(s, providerRegex, ($, provider, icon) => {
        addMatch(matches, [icon, provider])
        return `${provider}_${icon.replaceAll('-', '_')}`
      })

      const imports = Object.values(matches)
        .map(
          ([icon, provider]) =>
            `\n      import ${provider}_${icon.replaceAll('-', '_')} from '@magicons/${provider}-icons/icons/${icon}.json';`,
        )
        .join('\n')

      s =
        ext == 'svelte'
          ? s.replaceAll(/<script([\S\s]*?)>([\S\s]*?)<\/script>/g, (original, $atributes, g) => {
              return original.replace(g, imports + '\n' + g)
            })
          : s.prepend(imports)

      return {
        code: s.toString(),
        map: s.generateMap({ hires: true, file: id }),
      }
    },
  } satisfies PluginOption
}
