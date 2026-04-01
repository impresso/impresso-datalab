import { readdirSync, readFileSync, writeFileSync } from "node:fs"
import { join, resolve } from "node:path"
import { parse, stringify } from "yaml"

import {
  getLatestCommitFromUrl,
  getIpynbContentsFromUrl,
} from "../utils/githubApi.js"
import { extractMdFromIpynbCells, getTitleFromIpynb } from "../utils/ipynb.js"
import { projectRoot } from "./utils"

interface NotebookLink {
  href: string
  label: string
}

interface NotebookFrontmatter {
  githubUrl?: string
  sha?: string
  title?: string
  date?: string
  links?: NotebookLink[]
  googleColabUrl?: string
  [key: string]: unknown
}

interface NotebookCell {
  cell_type: string
  source?: string | string[]
  [key: string]: unknown
}

interface NotebookData {
  cells: NotebookCell[]
  metadata?: {
    kernelspec?: {
      language?: string
      [key: string]: unknown
    }
    [key: string]: unknown
  }
  [key: string]: unknown
}

interface GitHubCommit {
  sha: string
  commit: {
    author: {
      date: string
    }
  }
}

interface TitleExtractionResult {
  title: string
  source?: string[]
  cellIdx: number
}

const NOTEBOOKS_DIR = resolve(projectRoot, "src/content/notebooks")
const WARNING_PREFIX = "\x1b[33m⚠ skip\x1b[0m"

function readFrontmatterFromMdx(content: string): NotebookFrontmatter | null {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
  if (!frontmatterMatch) {
    return null
  }

  const parsed = parse(frontmatterMatch[1])
  if (!parsed || typeof parsed !== "object") {
    return null
  }

  return parsed as NotebookFrontmatter
}

function getGithubUrl(
  frontmatter: NotebookFrontmatter,
  content: string,
): string | null {
  if (
    typeof frontmatter.githubUrl === "string" &&
    frontmatter.githubUrl.trim()
  ) {
    return frontmatter.githubUrl.trim().replace(/"/g, "")
  }

  const fallbackMatch = content.match(/githubUrl:\s(https:\/\/.*)/)
  if (!fallbackMatch?.[1]) {
    return null
  }

  return fallbackMatch[1].replace(/"/g, "")
}

function toRawGitHubUrl(url: string): string {
  return url
    .replace("github.com", "raw.githubusercontent.com")
    .replace("/blob", "")
}

function toGoogleColabUrl(url: string): string {
  return `https://colab.research.google.com/${url.replace(/https:\/\/.*?github.com/, "github")}`
}

function removeNotebookTitleCell(
  cells: NotebookCell[],
  titleCellIndex: number,
  sourceWithoutTitle: string[] | undefined,
): NotebookCell[] {
  if (!Array.isArray(sourceWithoutTitle)) {
    return cells
  }

  return cells.map((cell, index) => {
    if (index !== titleCellIndex) {
      return cell
    }

    return {
      ...cell,
      source: sourceWithoutTitle,
    }
  })
}

async function updateOneNotebook(notebookFilename: string): Promise<void> {
  const notebookPath = join(NOTEBOOKS_DIR, notebookFilename)
  console.log("\n- read notebook", notebookPath)

  if (!notebookFilename.endsWith(".mdx")) {
    console.log(`${WARNING_PREFIX}, not a mdx file`)
    return
  }

  const notebookMdx = readFileSync(notebookPath, "utf8")
  const frontmatter = readFrontmatterFromMdx(notebookMdx)
  if (!frontmatter) {
    console.log(`${WARNING_PREFIX}, no frontmatter found`)
    return
  }

  const githubUrl = getGithubUrl(frontmatter, notebookMdx)
  if (!githubUrl) {
    console.log(`${WARNING_PREFIX}, no githubUrl found`)
    return
  }

  console.log("  githubUrl:", githubUrl)

  const commit = (await getLatestCommitFromUrl(
    githubUrl,
  )) as GitHubCommit | null
  if (!commit) {
    console.log(
      `${WARNING_PREFIX}, no commit found. Please double check the url.`,
    )
    return
  }

  if (!process.env.FORCE_UPDATE && frontmatter.sha === commit.sha) {
    console.log(`${WARNING_PREFIX}, sha is unchanged`)
    return
  }

  console.log("✓ sha:", commit.sha)
  console.log("✓ date:", commit.commit.author.date)

  const ipynbUrl = toRawGitHubUrl(githubUrl)
  console.log("✓ ipynbUrl:", ipynbUrl)

  const ipynb = (await getIpynbContentsFromUrl(ipynbUrl)) as NotebookData | null
  if (!ipynb) {
    console.log(
      `${WARNING_PREFIX}, no ipynb found. Please double check the url.`,
    )
    return
  }

  console.log("✓ ipynb", ipynb.cells.length, "cells")

  const titleResult = getTitleFromIpynb(
    ipynb.cells,
  ) as TitleExtractionResult | null
  if (!titleResult?.title) {
    console.log(`${WARNING_PREFIX}, no heading found in ipynb`)
    return
  }

  const cellsWithoutTitle = removeNotebookTitleCell(
    ipynb.cells,
    titleResult.cellIdx,
    titleResult.source,
  )

  const { content, links } = extractMdFromIpynbCells(
    ipynb.metadata?.kernelspec ?? {},
    cellsWithoutTitle,
  ) as { content: string; links: NotebookLink[] }

  const nextFrontmatter: NotebookFrontmatter = {
    ...frontmatter,
    title: titleResult.title,
    sha: commit.sha,
    date: commit.commit.author.date,
    links,
    googleColabUrl: toGoogleColabUrl(githubUrl),
  }

  const nextMdx = `---\n${stringify(nextFrontmatter)}---\n\n${content}`
  writeFileSync(notebookPath, nextMdx, "utf8")

  console.log("✓ updated", notebookFilename)
}

async function main(): Promise<void> {
  const notebookToUpdate = process.argv[2]
  const notebooks = readdirSync(NOTEBOOKS_DIR)

  console.log("NotebooksDir", NOTEBOOKS_DIR)
  if (notebookToUpdate) {
    console.log("update only", notebookToUpdate)
  }

  for (const notebookFilename of notebooks) {
    if (notebookToUpdate && notebookFilename !== notebookToUpdate) {
      console.log("skipping", notebookFilename, "looking for", notebookToUpdate)
      continue
    }

    await updateOneNotebook(notebookFilename)
  }
}

main().catch((error: unknown) => {
  console.error("Error while updating notebooks:", error)
  process.exit(1)
})
