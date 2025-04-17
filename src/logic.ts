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

/**
 * Recursively transforms all keys in an object to camelCase
 * @param obj The object to transform
 * @returns A new object with all keys in camelCase
 */
export function toCamelCase(obj: any): any {
  // Return directly if null or not an object
  if (obj === null || typeof obj !== "object" || Array.isArray(obj)) {
    return obj
  }

  // Create a new object for the result
  const result: any = {}

  // Process each key in the object
  Object.keys(obj).forEach((key) => {
    // Transform the key to camelCase
    const camelKey = key
      .split(/[\s_-]+/)
      .map((word, index) => {
        if (index === 0) {
          return word.toLowerCase()
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      })
      .join("")

    // Process value recursively if it's an object
    if (typeof obj[key] === "object" && obj[key] !== null) {
      if (Array.isArray(obj[key])) {
        // Handle arrays by mapping each element
        result[camelKey] = obj[key].map((item: any) =>
          typeof item === "object" && item !== null ? toCamelCase(item) : item
        )
      } else {
        // Handle nested objects
        result[camelKey] = toCamelCase(obj[key])
      }
    } else {
      // For non-objects, just use the value directly
      result[camelKey] = obj[key]
    }
  })

  return result
}
