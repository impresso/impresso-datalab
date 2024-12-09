import { getEntry } from "astro:content"

export async function getRecursivelyEntryData(entry: any) {
  const result: any = {}

  if (entry.collection && entry.id) {
    result.collection = entry.collection
    result.href = `${entry.collection}/${entry.id}`
  } else if (entry.id) {
    result.href = `${entry.id}`
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
