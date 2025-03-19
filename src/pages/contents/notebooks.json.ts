import { getCollection, getEntry } from "astro:content"
import { getRecursivelyEntryData } from "../../logic"
export async function GET() {
  const notebooks = await getCollection("notebooks")
  //  for each notebook, get the content and split into sentences
  const notebookEntries = []
  for (const notebook of notebooks) {
    const data = await getRecursivelyEntryData(notebook)
    const entry = await getEntry("notebooks", notebook.id)
    // cells are prefixed with {/* cell:3 cell_type:markdown */}
    // lets split and filter out non markdown cells
    const sentences = (entry?.body || "")
      .split(/(\{.*?\})/)
      .filter((d: string) => {
        // remove  "{/* cell:0 cell_type:mark
        // down */}",
        return !d.match(/cell:\d+ cell_type:/)
      })
      .map((d) => {
        // remove all img tags
        const cleanedStr = d
          .replace(/<img[\s\S]*?>/g, "")
          .replace(/<a[\s\S]*?<\/a>/gim, "")
        return cleanedStr
      })
      .filter((d: string) => {
        // remove empty strings
        return d.trim() !== ""
      })

    notebookEntries.push({
      title: data.title,
      authors: data.authors,
      excerpt: data.excerpt,
      date: data.date,
      tags: data.tags,
      levels: data.levels,
      href: data.href,
      googleColabUrl: data.googleColabUrl,
      // body: entry?.body,
      sentences,
    })
  }
  return new Response(JSON.stringify(notebookEntries, null, 2))
}
