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

// if there is a argument to the script, we only update the notebook with the same name
const notebookToUpdate = process.argv[2]
if (notebookToUpdate) {
  console.log("update only", notebookToUpdate)
}
// get all files in the dir
;(async () => {
  for (const notebook of Notebooks) {
    if (notebookToUpdate && notebook !== notebookToUpdate) {
      console.log("skipping", notebook, "looking for", notebookToUpdate)
      continue
    }
    const notebookPath = join(NotebooksDir, notebook)
    console.log("\n- read notebook", notebookPath)
    if (!notebook.endsWith(".mdx")) {
      console.log("\x1b[33m⚠ skip\x1b[0m, not a mdx file ")
      continue
    }
    console.log("  get `githubUrl` value from yaml frontmatter...")
    const notebookMdx = readFileSync(notebookPath, "utf8")
    const frontmatterMdx = notebookMdx.match(/---\n([\s\S]*?)\n---/)
    if (!frontmatterMdx) {
      console.log("\x1b[33m⚠ skip\x1b[0m, no frontmatter found")
      continue
    }
    const frontmatter = parse(frontmatterMdx[1])
    console.log("✓ frontmatter found", frontmatter)
    const match = notebookMdx.match(/githubUrl:\s(https:\/\/.*)/)
    if (!match) {
      console.log("\x1b[33m⚠ skip\x1b[0m, no `githubUrl` found")
      continue
    }
    const url = match[1].replace(/"/g, "")
    console.log("  githubUrl:", url)

    const commit = await getLatestCommitFromUrl(url)
    if (!commit) {
      console.log(
        "\x1b[33m⚠ skip\x1b[0m, no commit found? Please double check tuhe url.",
      )
      continue
    }
    console.log("✓ sha:", commit.sha)
    console.log("✓ date:", commit.commit.author.date)
    // if the sha is the same as the one in the frontmatter, we skip
    if (!process.env.FORCE_UPDATE && frontmatter.sha === commit.sha) {
      console.log(
        "\x1b[33m⚠ skip\x1b[0m, sha is the same as the one in the frontmatter",
      )
      continue
    }
    // get the ipynb content
    const ipynbUrl = url
      .replace("github.com", "raw.githubusercontent.com")
      .replace("/blob", "")
    console.log("✓ ipynbUrl:", ipynbUrl)
    // get the content of the remote file
    const ipynb = await getIpynbContentsFromUrl(ipynbUrl)
    // save the content to the notebook file
    if (!ipynb) {
      console.log(
        "\x1b[33m⚠ skip\x1b[0m, no ipynb found? Please double check the url.",
      )
      continue
    }

    console.log("✓ ipynb", ipynb.cells.length, "cells")
    const {
      title,
      source: sourceWithoutTitle,
      cellIdx,
    } = getTitleFromIpynb(ipynb.cells)
    if (!title) {
      console.log("⚠ title? no heading found in ipynb")
      continue
    }
    console.log("✓ title:", `\x1b[33m${title}\x1b[0m`)
    const { content: contentMdx, links } = extractMdFromIpynbCells(
      ipynb.metadata.kernelspec,
      ipynb.cells.map((_d, i) => {
        if (i !== cellIdx) {
          return _d
        }
        return {
          ..._d,
          source: sourceWithoutTitle,
        }
      }),
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
      links: links,
      googleColabUrl,
    }
    const newMdx = `---\n${stringify(newFrontmatter)}---\n\n${contentMdx}`
    writeFileSync(notebookPath, newMdx)
  }
})()
