import fs from "fs"
import { Index } from "flexsearch" // create JSON file on the fly

import { readFile, writeFile } from "fs/promises"

// Define the structure of your JSON data
interface DataItem {
  sentences: string[]
}

// Initialize FlexSearch index
const index = new Index({
  tokenize: "forward",

  threshold: 2,
  resolution: 9,
})

async function createIndex() {
  try {
    // Load JSON file
    const rawData = await readFile("data.json", "utf-8")
    const data: DataItem[] = JSON.parse(rawData)

    // Index the data
    data.forEach((item, id) => {
      item.sentences.forEach((sentence) => {
        index.add(id, sentence) // Index each sentence separately
      })
    })

    // Export index to a JSON file
    const exportedIndex = index.export()
    await writeFile("index.json", JSON.stringify(exportedIndex))

    console.log("✅ Indexing complete! Saved as index.json.")
  } catch (error) {
    console.error("❌ Error creating index:", error)
  }
}

// Run the indexing process
createIndex()
