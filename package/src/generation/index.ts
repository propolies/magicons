import { providers, type Providers } from "../lib/providers.js"
import fs from 'fs'
import { icons as hero, type IconifyJSON } from '@iconify-json/heroicons'
import { icons as lucide } from '@iconify-json/lucide'
import MagicString from "magic-string"
import { CamelCase, capitalize } from "./utils.js"

const providerMap = {
  hero,
  lucide
} as Record<Providers, IconifyJSON>

const providerTransforms: Record<Providers, (body: MagicString) => MagicString> = {
  hero: (body) => {
    return body.replaceAll(/stroke-width="(\S*)"/g, (original, g) => {
      console.log("G", g)
      return original
    })
  },
  lucide: (body) => {
    return body
  }
}

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
    const s = providerTransforms[provider](new MagicString(opts.body))
    fs.writeFileSync(`${distPath}/icons/${iconName}.json`, JSON.stringify({
      width: opts.width,
      height: opts.height,
      body: s.toString()
    }))
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
      "./icons/*.json": {
        "default": "./dist/icons/*.json"
      }
    },
    keywords: [],
    license: "ISC",
    type: "module",
    types: "./dist/index.d.ts"
  }, null, 2))
})