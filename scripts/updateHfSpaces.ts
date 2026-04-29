/**
 * updateHfSpaces.ts
 *
 * Fetches all Hugging Face Spaces for a list of authors and enriches each entry
 * using the individual Space API. Saves progress to src/content/hfSpaces.yaml
 * after every write so the file is always in a valid (partial) state.
 *
 * Usage:
 *   tsx ./scripts/updateHfSpaces.ts
 *
 * Optional env vars:
 *   HF_TOKEN  – Hugging Face token (increases API rate limits)
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { stringify } from "yaml"
import { projectRoot } from "./utils"

// ─── Configuration ────────────────────────────────────────────────────────────

const HF_AUTHORS = ["impresso-project"]

const OUTPUT_FILE = resolve(projectRoot, "src/content/hfSpaces.yaml")

const HF_TOKEN = process.env.HF_TOKEN ?? ""

// ─── Types ────────────────────────────────────────────────────────────────────

interface HfSpaceListItem {
  id: string
}

interface HfSpaceDetail {
  _id: string
  id: string
  sdk?: string
  likes?: number
  tags?: string[]
  private?: boolean
  author?: string
  sha?: string
  lastModified?: string
  cardData?: {
    title?: string
    description?: string
    emoji?: string
    colorFrom?: string
    colorTo?: string
    sdk?: string
    app_file?: string
    pinned?: boolean
    license?: string
  }
  subdomain?: string
  gated?: boolean
  disabled?: boolean
  host?: string
  models?: string[]
  createdAt?: string
}

/** Shape written to YAML – matches the Zod schema in src/content/config.ts */
interface HfSpaceEntry {
  id: string
  author?: string
  lastModified?: string
  cardData?: {
    title: string
    description: string
    emoji: string
    colorFrom: string
    colorTo: string
    sdk: string
    app_file: string
    pinned: boolean
    license: string
  }
  host?: string
  models?: string
  subdomain?: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/json",
  }
  if (HF_TOKEN) {
    headers["Authorization"] = `Bearer ${HF_TOKEN}`
  }
  return headers
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, { headers: buildHeaders() })
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`)
  }
  return response.json() as Promise<T>
}

function saveYaml(entries: HfSpaceEntry[]): void {
  const yamlContent = stringify(entries, { lineWidth: 0 })
  writeFileSync(OUTPUT_FILE, yamlContent, "utf-8")
}

function mapDetailToEntry(detail: HfSpaceDetail): HfSpaceEntry {
  return {
    id: detail.id,
    author: detail.author ?? detail.id.split("/")[0],
    lastModified:
      detail.lastModified ?? detail.createdAt ?? new Date().toISOString(),
    cardData: {
      title: detail.cardData?.title ?? detail.id.split("/")[1] ?? detail.id,
      description: detail.cardData?.description ?? "",
      emoji: detail.cardData?.emoji ?? "",
      colorFrom: detail.cardData?.colorFrom ?? "",
      colorTo: detail.cardData?.colorTo ?? "",
      sdk: detail.cardData?.sdk ?? detail.sdk ?? "",
      app_file: detail.cardData?.app_file ?? "",
      pinned: detail.cardData?.pinned ?? false,
      license: detail.cardData?.license ?? "",
    },
    host: detail.host,
    models: Array.isArray(detail.models)
      ? detail.models.join(",")
      : (detail.models ?? ""),
    subdomain: detail.subdomain ?? "",
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.info("🤗 updateHfSpaces – starting")
  if (HF_TOKEN) {
    console.info("  HF_TOKEN: ***** [provided]")
  } else {
    console.warn("  HF_TOKEN: [not provided] – rate limits may apply")
  }

  // 1. Collect all space IDs from the list endpoint for every author
  const stubEntries: HfSpaceEntry[] = []

  for (const author of HF_AUTHORS) {
    console.info(`\n→ Fetching spaces for author: ${author}`)
    const listUrl = `https://huggingface.co/api/spaces?author=${encodeURIComponent(author)}&full=true`
    const spaceList = await fetchJson<HfSpaceListItem[]>(listUrl)

    console.info(`  Found ${spaceList.length} space(s)`)
    for (const item of spaceList) {
      stubEntries.push({ id: item.id })
    }
  }

  // 2. Save stub YAML immediately (partial state with only id)
  console.info(
    `\n✓ Saving stub YAML with ${stubEntries.length} id(s) → ${OUTPUT_FILE}`,
  )
  saveYaml(stubEntries)

  // 3. Enrich each entry from the detail API, saving after every update
  const enrichedEntries: HfSpaceEntry[] = [...stubEntries]

  for (let i = 0; i < stubEntries.length; i++) {
    const { id } = stubEntries[i]
    const detailUrl = `https://huggingface.co/api/spaces/${id}`
    console.info(
      `\n[${i + 1}/${stubEntries.length}] Fetching details for: ${id}`,
    )

    try {
      const detail = await fetchJson<HfSpaceDetail>(detailUrl)
      enrichedEntries[i] = mapDetailToEntry(detail)
      console.info(`  ✓ Enriched: ${enrichedEntries[i].cardData?.title ?? id}`)
    } catch (err) {
      console.error(
        `  ✗ Failed to fetch details for ${id}:`,
        (err as Error).message,
      )
      // Keep the stub entry so the YAML stays consistent
    }

    // Save after every enrichment (incremental progress)
    saveYaml(enrichedEntries)
    console.info(`  → Saved progress (${i + 1}/${stubEntries.length})`)
  }

  console.info(
    `\n✅ Done. ${enrichedEntries.length} spaces written to ${OUTPUT_FILE}`,
  )
}

main().catch((err) => {
  console.error("Fatal error:", err)
  process.exit(1)
})
