import { getCollection } from "astro:content"

export async function getStaticPaths() {
  const collection = await getCollection("dataProviders")
  return collection.map((entry) => ({
    params: { id: entry.id },
    props: { entry },
  }))
}

interface Props {
  entry: Awaited<ReturnType<typeof getCollection<"dataProviders">>>[number]
}

export async function GET({ props }: { props: Props }) {
  const { entry } = props

  return new Response(
    JSON.stringify({
      id: entry.id,
      ...entry.data,
      content: entry.body,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  )
}
