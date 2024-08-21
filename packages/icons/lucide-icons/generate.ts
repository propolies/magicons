import { generate } from "../../generator"
// import { icons } from '@iconify-json/lucide'
// generateSvg(icons.icons)

generate({
  provider: "lucide",
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