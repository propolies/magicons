import { match } from 'assert'
import MagicString from 'magic-string'

function addMatch(matches: Record<string, [string, string]>, match: [string, string]) {
  const key = match.join(".")
  if (matches[key]) return
  matches[key] = match
}

export function magicon() {
  return {
    name: "magicon preprocessor",
    markup: ({ content, filename }: { content: string, filename: string }) => {
      const [file, ext] = filename.split("/").at(-1)!.split(".").slice(-2)
      if (filename.includes("node_modules")) return
      if (!filename.includes("src")) return
      if (!["ts", "js", "svelte"].includes(ext)) return

      const matches: Record<string, [string, string]> = {}

      let s = new MagicString(new MagicString(content, { filename })
        .replaceAll(/"@(hero|lucide|logos)-(\S*)"/g, ($, provider, icon) => {
          addMatch(matches, [icon, provider])
          return icon.replaceAll("-", "_")
        })
        .toString())

      const imports = Object.values(matches).map(
        ([icon, provider]) => `\n      import ${icon.replaceAll("-", "_")} from '@magicon/${provider}-icons/icons/${icon}.svg?raw';`
      ).join("\n")

      s = ext == "svelte"
        ? s.replaceAll(/<script([\S\s]*?)>([\S\s]*?)<\/script>/g, (original, $atributes, g) => {
          return original.replace(g, imports + "\n" + g)
        })
        : s.prepend(imports)

      return {
        code: s.toString(),
        map: s.generateMap({ hires: true, file: filename })
      }
    }
  }
}