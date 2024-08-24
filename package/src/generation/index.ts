import { providers } from "../lib/providers.js"
import fs from 'fs'

const rootPath = "../../.."
const iconsPath = rootPath + "/icons"

fs.rmSync(iconsPath, {
  recursive: true,
  force: true
})
fs.mkdirSync(iconsPath)

fs.mkdirSync(iconsPath + "/test")

providers.forEach((provider) => {
  const packagePath = `${iconsPath}/${provider}`
  fs.mkdirSync(packagePath)
  fs.writeFileSync(packagePath + "/package.json", JSON.stringify({
    test: 123
  }))
})