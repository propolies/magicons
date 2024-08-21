import { generate, generateSvg } from "../../generator"
// import { icons } from '@iconify-json/logos'
// generateSvg(icons.icons)

generate({
  provider: "logos",
  getIcons(fs) {
    const files = fs.readdirSync("./svgs")
    return files.map((filename) => {
      const src = fs.readFileSync(`./svgs/${filename}`).toString()
      return {
        filename,
        src,
        theme: ""
      }
    })
  }
})