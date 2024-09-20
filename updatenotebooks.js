// go through alll mdx files in the notebooks folder and get their url from the frontmatter
// If the url points to the latest version of a notebook, we use utils/githubApi module to get the latest sha.

import { readdirSync, readFileSync, writeFileSync } from "fs"
import { join } from "path"
import { parse, stringify } from "yaml"
import {
  getLatestCommitFromUrl,
  getIpynbContentsFromUrl,
} from "./utils/githubApi.js"
import { extractMdFromIpynbCells, getTitleFromIpynb } from "./utils/ipynb.js"
const NotebooksDir = "./src/content/notebooks"
const Notebooks = readdirSync(NotebooksDir)

console.log("NotebooksDir", NotebooksDir)

// get all files in the dir
;(async () => {
  for (const notebook of Notebooks) {
    const notebookPath = join(NotebooksDir, notebook)
    console.log("\n- read notebook", notebookPath)
    if (!notebook.endsWith(".mdx")) {
      console.log("⚠ skipping, not a mdx file ")
      continue
    }
    console.log("  get `githubUrl` value from yaml frontmatter...")
    const notebookMdx = readFileSync(notebookPath, "utf8")
    const frontmatterMdx = notebookMdx.match(/---\n([\s\S]*?)\n---/)
    if (!frontmatterMdx) {
      console.log("⚠ skipping, no frontmatter found")
      continue
    }
    const frontmatter = parse(frontmatterMdx[1])
    console.log("✓ frontmatter found", frontmatter)
    const match = notebookMdx.match(/githubUrl:\s(https:\/\/.*)/)
    if (!match) {
      console.log("⚠ skipping, no `githubUrl` found")
      continue
    }
    const url = match[1].replace(/"/g, "")
    console.log("  githubUrl:", url)

    const commit = await getLatestCommitFromUrl(url)
    if (!commit) {
      console.log("⚠ skipping, no commit found? Please double check tuhe url.")
      continue
    }
    console.log("✓ sha:", commit.sha)
    console.log("✓ date:", commit.commit.author.date)
    // get the ipynb content
    const ipynbUrl = url
      .replace("github.com", "raw.githubusercontent.com")
      .replace("/blob", "")
    console.log("✓ ipynbUrl:", ipynbUrl)
    // get the content of the remote file
    const ipynb = await getIpynbContentsFromUrl(ipynbUrl)
    // save the content to the notebook file
    if (!ipynb) {
      console.log("⚠ skipping, no ipynb found? Please double check the url.")
      continue
    }

    console.log("✓ ipynb", ipynb.cells.length, "cells")
    const { title, cellIdx } = getTitleFromIpynb(ipynb.cells)
    if (!title) {
      console.log("⚠ title? no heading found in ipynb")
      continue
    }
    console.log("✓ title:", title)
    const contentMdx = extractMdFromIpynbCells(
      ipynb.metadata.kernelspec,
      ipynb.cells.filter((_d, i) => i !== cellIdx),
    )
    const googleColabUrl = `https://colab.research.google.com/${url.replace(
      /https:\/\/.*?github.com/,
      "github",
    )}`
    // get current yaml from frontùatter
    const newFrontmatter = {
      ...frontmatter,
      title,
      sha: commit.sha,
      date: commit.commit.author.date,
      googleColabUrl,
    }
    const newMdx = `---\n${stringify(newFrontmatter)}---\n\n${contentMdx}`
    writeFileSync(notebookPath, newMdx)
  }
})()
