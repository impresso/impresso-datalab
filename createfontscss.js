const fs = require("fs")
const FontsCssFilePath = "./src/styles/fonts.css"

let basepath = process.env.GATSBY_PATH_PREFIX || ""

// remove final slash if any
if (basepath.endsWith("/")) {
  basepath = basepath.slice(0, -1)
}

console.log("GATSBY_PATH_PREFIX", process.env.GATSBY_PATH_PREFIX)
console.log("fonts.css path:", FontsCssFilePath)
console.log("basepath:", basepath)

const fonts = `
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
console.log("fonts.css expected contents:", fonts)
fs.writeFileSync(FontsCssFilePath, fonts)
console.log("fonts.css updated.")
