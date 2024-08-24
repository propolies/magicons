import { providers } from "../lib/providers.js"
import fs from 'fs'
import { icons as hero, type IconifyJSON } from '@iconify-json/heroicons'
import { icons as lucide } from '@iconify-json/lucide'
import MagicString from "magic-string"

function capitalize(str: string) {
  return str[0].toUpperCase() + str.slice(1)
}

function CamelCase(str: string) {
  return str.split("-").map(capitalize).join(" ")
}

const providerMap = {
  hero,
  lucide
} as Record<string, IconifyJSON>

const iconsPath = "../icons"

if (!fs.existsSync(iconsPath)) {
  throw new Error("This script is meant to be run in ./package")
}

const config: {
  versions: string
} = JSON.parse(fs.readFileSync(iconsPath + "/config.json").toString())
// config.versions = Number(config.versions.split(".")!.at(-1)!) + 1 + ""

providers.forEach((provider) => {
  const packagePath = `${iconsPath}/${provider}`
  const distPath = `${iconsPath}/${provider}/dist`

  fs.rmSync(packagePath, {
    recursive: true,
    force: true
  })
  fs.mkdirSync(packagePath)
  fs.mkdirSync(distPath)
  fs.mkdirSync(distPath + "/icons")

  const icons = providerMap[provider].icons
  const iconNames = Object.entries(icons).map(([icon, opts]) => {
    const iconName = CamelCase(icon).replaceAll(" ", "")
    const s = new MagicString(opts.body)
    fs.writeFileSync(`${distPath}/icons/${iconName}.js`, `
      export default ${JSON.stringify({
    width: opts.width,
    height: opts.height,
    body: s.toString()
  })};
    `)
    return iconName
  })

  fs.writeFileSync(distPath + "/index.d.ts", `
    declare global {
      var ${capitalize(provider)}Icons: "${iconNames.map((name) => `@${provider}-${name}`).join('"|"')}";
    }

    export {}
  `)

  fs.writeFileSync(distPath + "/index.js", `
    export {};
  `)

  fs.writeFileSync(packagePath + "/package.json", JSON.stringify({
    name: `@magicons/${provider}-icons`,
    version: config.versions,
    description: "generated hero-icons for magicon",
    author: {
      name: "propolies",
      url: "https://github.com/propolies"
    },
    main: "./dist/index.js",
    repository: {
      type: "git",
      url: "git+https://github.com/propolies/magicons.git",
      directory: "package"
    },
    homepage: "https://propolies.github.io/magicons/",
    scripts: {
      build: "tsc && tsx generate"
    },
    files: [
      "dist",
      "!dist/**/*.test.*",
      "!dist/**/*.spec.*"
    ],
    exports: {
      ".": {
        "types": "./dist/index.d.ts",
        "import": "./dist/index.js"
      },
      "./icons/*.js": {
        "default": "./dist/icons/*.js"
      }
    },
    keywords: [],
    license: "ISC",
    type: "module",
    types: "./dist/index.d.ts"
  }, null, 2))
})