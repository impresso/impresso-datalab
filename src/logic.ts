import { getEntry } from "astro:content"

export async function getRecursivelyEntryData(entry: any) {
  const result: any = {}

  if (entry.collection && entry.slug) {
    result.collection = entry.collection
    result.href = `${entry.collection}/${entry.slug}`
  } else if (entry.slug) {
    result.href = `${entry.slug}`
  }

  for (const k of Object.keys(entry.data)) {
    const d = entry.data[k]
    if (Array.isArray(d)) {
      result[k] = []
      for (const en of entry.data[k]) {
        if (typeof en === "object" && typeof en.collection === "string") {
          const nextEntry = await getEntry(en.collection, en.slug ?? en.id)
          result[k].push(await getRecursivelyEntryData(nextEntry))
        } else {
          result[k].push(en)
        }
      }
    } else {
      result[k] = d
    }
  }
  return result
}
