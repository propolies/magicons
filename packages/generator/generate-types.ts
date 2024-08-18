import { readdirSync, writeFileSync } from "fs"

const path = "../hero-icons"
const distPath = path + "/dist"

writeFileSync("../core/src/lib/types.ts", "export type Icons = " + readdirSync(distPath).map((name) => `"@hero-${name.split(".")[0]}"`).join("|"))