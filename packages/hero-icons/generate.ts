import { generate } from "../generator"

generate({
  provider: "hero",
  path: "../hero-icons",
  getIcons(fs) {
    const sizes = ["16", "20", "24"]
    const themeMap = {
      16: "-micro",
      20: "-mini",
      24: ""
    }

    return sizes.flatMap((size) => {
      const themesPath = `./svgs/${size}`
      const themes = fs.readdirSync(themesPath)
      return themes.flatMap((theme) => {
        const filenames = fs.readdirSync(`${themesPath}/${theme}`)
        return filenames.map((filename) => {
          const src = fs.readFileSync(`${themesPath}/${theme}/${filename}`).toString()
          const processedTheme = `${themeMap[size]}${(size !== "24" || theme == "outline") ? "" : "-" + theme}` as `-${string}` | ""
          return {
            filename,
            theme: processedTheme,
            src
          }
        })
      })
    })
  }
})