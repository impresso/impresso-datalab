import { getCollection } from "astro:content"
export async function GET() {
  const datasets = await getCollection("datasets")
  return new Response(
    JSON.stringify(
      datasets.map((d) => d.data),
      null,
      2
    )
  )
}
