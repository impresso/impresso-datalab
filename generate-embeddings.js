import fs from 'fs';
import * as use from '@tensorflow-models/universal-sentence-encoder';
import '@tensorflow/tfjs-node';

const pages = [
  { title: "About Us", content: "We are a company that values innovation and creativity." },
  { title: "Contact", content: "Reach us via email at contact@ourcompany.com." },
  { title: "Services", content: "We offer web development, AI solutions, and more." },
];

async function generateEmbeddings() {
  console.log("Loading model...");
  const model = await use.load();
  console.log("Model loaded!");

  const pageTexts = pages.map((p) => p.content);
  const embeddings = await model.embed(pageTexts);
  const embeddingsArray = embeddings.arraySync();

  const data = pages.map((page, index) => ({
    title: page.title,
    content: page.content,
    embedding: embeddingsArray[index],
  }));

  fs.writeFileSync("embeddings.json", JSON.stringify(data, null, 2));
  console.log("Embeddings saved to embeddings.json");
}

generateEmbeddings();


// # Use an official Node.js image with Python & build tools preinstalled
// FROM node:18-bullseye

// # Set the working directory inside the container
// WORKDIR /app

// # Install Python and other dependencies required by node-gyp
// RUN apt-get update && apt-get install -y python3 python3-pip build-essential && \
//     ln -sf /usr/bin/python3 /usr/bin/python

// # Copy package.json and package-lock.json first (for caching)
// COPY package*.json ./

// # Install dependencies, including TensorFlow.js
// RUN npm install @tensorflow-models/universal-sentence-encoder @tensorflow/tfjs-node

// # Copy the remaining project files
// COPY generateEmbeddings.js .

// # Run the embedding generation script
// CMD ["node", "generateEmbeddings.js"]