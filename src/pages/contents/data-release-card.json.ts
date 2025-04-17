import { getCollection } from "astro:content"
export async function GET() {
  const dataReleaseCard = await getCollection("dataReleaseCard")
  return new Response(JSON.stringify(dataReleaseCard.data, null, 2))
}
