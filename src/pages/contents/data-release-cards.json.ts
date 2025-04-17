import { getCollection } from "astro:content"
export async function GET() {
  const collection = await getCollection("dataReleaseCards")
  return new Response(JSON.stringify(collection.map((d) => d.data)), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
    status: 200,
  })
}
