import { getCollection } from "astro:content"

// https://docs.astro.build/en/guides/endpoints/
export async function GET() {
  const collection = await getCollection("dataProviders")
  return new Response(
    JSON.stringify(
      collection.map((entry) => ({
        id: entry.id,
        ...entry.data,
      })),
    ),
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  )
}
