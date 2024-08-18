import MagicString from 'magic-string'

export function magicon() {
  return {
    name: "magicon preprocessor",
    markup: ({ content, filename }: { content: string, filename: string }) => {
      const [file, ext] = filename.split("/").at(-1)!.split(".").slice(-2)
      if (filename.includes("node_modules")) return
      if (!filename.includes("src")) return
      if (!["ts", "js", "svelte"].includes(ext)) return

      const matches = new Set<string>()
      let s = new MagicString(new MagicString(content, { filename })
        .replaceAll(/"@hero-(\S*)"/g, ($, icon) => {
          matches.add(icon)
          return icon.replaceAll("-", "_")
        })
        .toString())

      const imports = [...matches].map(
        (icon) => `\n      import ${icon.replaceAll("-", "_")} from '@magicon/hero-icons/${icon}.svg?raw';`
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