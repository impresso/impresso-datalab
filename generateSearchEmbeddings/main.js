import fs from "fs"
import * as use from "@tensorflow-models/universal-sentence-encoder"
import "@tensorflow/tfjs-node"

const pages = [
  {
    title: "About Us",
    content: "We are a company that values innovation and creativity.",
  },
  {
    title: "Contact",
    content: "Reach us via email at contact@ourcompany.com.",
  },
  {
    title: "Services",
    content: "We offer web development, AI solutions, and more.",
  },
]

async function generateEmbeddings() {
  console.log("Loading model...")
  const model = await use.load()
  console.log("Model loaded!")

  const pageTexts = pages.map((p) => p.content)
  const embeddings = await model.embed(pageTexts)
  const embeddingsArray = embeddings.arraySync()

  const data = pages.map((page, index) => ({
    title: page.title,
    content: page.content,
    embedding: embeddingsArray[index],
  }))

  fs.writeFileSync("embeddings.json", JSON.stringify(data, null, 2))
  console.log("Embeddings saved to embeddings.json")
}

generateEmbeddings()
