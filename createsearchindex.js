const fs = require("fs")
const FlexSearch = require("flexsearch")

// Load JSON file
const rawData = fs.readFileSync("data.json")
const data = JSON.parse(rawData)

// Initialize FlexSearch
const index = new FlexSearch.Index({
  tokenize: "forward",
  encode: "icase",
  threshold: 2,
  resolution: 9,
})

// Index the data
data.forEach((item, id) => {
  item.sentences.forEach((sentence) => {
    index.add(id, sentence) // Index each sentence
  })
})

// Save index to a JSON file
fs.writeFileSync("index.json", JSON.stringify(index.export()))
console.log("Indexing complete. Saved as index.json.")
