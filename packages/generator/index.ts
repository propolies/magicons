import * as fs from "fs"
import MagicString from "magic-string"

function capitalize(str: string) {
  return str[0].toUpperCase() + str.slice(1)
}

function CamelCase(str: string) {
  return str.split("-").map(capitalize).join("")
}

function generateSvg(icons: {[key: string]: { body: string }}) {
  Object.entries(icons).forEach(([name, src]) => {
    fs.writeFileSync(`./svgs/${name}.svg`, src.body)
  })
}

function generate({
  provider,
  getIcons
}: {
  provider: string,
  getIcons: ($fs: typeof fs) => {
    filename: string,
    theme: `-${string}` | "",
    src: string
  }[]
}) {

  const distPath = "./dist"
  const iconsPath = distPath + "/icons"
  const typePath = distPath + "/index.d.ts"
  const types: string[] = []

  fs.rmSync(iconsPath, {
    recursive: true,
    force: true
  })
  fs.mkdirSync(iconsPath)

  for (const { filename, theme, src } of getIcons(fs)) {
    const name = CamelCase(filename.split(".svg")[0])
    types.push(`"@${provider}-${name.split(".")[0]}"`)
    const s = new MagicString(src.toString())
      .prepend(`icon-${name}${theme}$`)
      .replaceAll(/fill="\S*"/g, () => 'fill="currentColor"')
      .replaceAll(/stroke="\S*"/g, () => 'stroke="currentColor"')
      .replaceAll(/stroke-width="\S*"/g, () => 'stroke-width="inherit"')
      .replace(/<svg.*>\n/g, () => '')
      .replace(/<\/svg>/g, () => '')
    fs.writeFileSync(`${iconsPath}/${name}${theme}.svg`, s.toString())
  }

  fs.writeFileSync(typePath, `
    declare global {
      var HeroIcons: ${types.join("|")};
    }

    export {}
  `)
}

export {
  generate,
  generateSvg
}