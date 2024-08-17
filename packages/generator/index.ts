import {
  readdirSync,
  mkdirSync,
  rmSync,
  writeFileSync,
  readFileSync
} from "fs"
import MagicString from "magic-string"

function capitalize(str: string) {
  return str[0].toUpperCase() + str.slice(1)
}

function CamelCase(str: string) {
  return str.split("-").map(capitalize).join("")
}

const path = "../hero-icons"
const distPath = path + "/dist"

const sizes = ["16", "20", "24"]

rmSync(distPath, {
  recursive: true,
  force: true
})
mkdirSync(distPath)

const themeMap = {
  16: "-micro",
  20: "-mini",
  24: ""
}

for (const size of sizes) {
  const themesPath = `${path}/svgs/${size}`
  const themes = readdirSync(themesPath)
  for (const theme of themes) {
    const names = readdirSync(`${themesPath}/${theme}`)
    for (const name of names) {
      const res = readFileSync(`${themesPath}/${theme}/${name}`)
      const icon = name.split(".svg")[0]
      const Icon = CamelCase(icon)
      const id = `${themeMap[size]}${(size !== "24" || theme == "outline") ? "" : "-" + theme}`
      const s = new MagicString(res.toString())
        .prepend("icon-" + Icon + id + "$")
        .replaceAll(/fill="\S*"/g, () => 'fill="currentColor"')
        .replaceAll(/stroke="\S*"/g, () => 'stroke="currentColor"')
        .replaceAll(/stroke-width="\S*"/g, () => 'stroke="inherit"')
        .replace(/<svg.*>\n/g, () => '')
        .replace(/<\/svg>/g, () => '')
      writeFileSync(`${distPath}/${Icon}${id}.svg`, s.toString())
    }
  }
}

writeFileSync("../core/src/lib/types.ts", "export type Icons = " + readdirSync(distPath).map((name) => `"@hero-${name.split(".")[0]}"`).join("|"))