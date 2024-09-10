import fs from "fs"

const FontsCssFilePath = "./src/styles/fonts.css"
const StoryBookFontsCssFilePath = "./.storybook/fonts.css"
import dotenv from "dotenv"

dotenv.config()

let basepath = process.env.IMPRESSO_DATALAB_BASE || ""

// remove final slash if any
if (basepath.endsWith("/")) {
  basepath = basepath.slice(0, -1)
}

console.log("IMPRESSO_DATALAB_BASE")
console.log("fonts.css path:", FontsCssFilePath)
console.log("basepath:", basepath)

const fonts = (basepath) => `
@font-face {
  font-family: "Satoshi-Variable";
  src: url("${basepath}/fonts/Satoshi-Variable.woff2") format("woff2"),
    url("${basepath}/fonts/Satoshi-Variable.woff") format("woff"),
    url("${basepath}/fonts/Satoshi-Variable.ttf") format("truetype");
  font-weight: 300 900;
  font-display: swap;
  font-style: normal;
}

@font-face {
  font-family: "Satoshi-VariableItalic";
  src: url("${basepath}/fonts/Satoshi-VariableItalic.woff2") format("woff2"),
    url("${basepath}/fonts/Satoshi-VariableItalic.woff") format("woff"),
    url("${basepath}/fonts/Satoshi-VariableItalic.ttf") format("truetype");
  font-weight: 300 900;
  font-display: swap;
  font-style: italic;
}
`
console.log("fonts.css expected contents:", fonts(basepath))
fs.writeFileSync(FontsCssFilePath, fonts(basepath))
console.log("fonts.css updated.")

fs.writeFileSync(StoryBookFontsCssFilePath, fonts("../public"))
console.log(`${StoryBookFontsCssFilePath} updated.`)
