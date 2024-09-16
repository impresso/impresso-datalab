import { z, defineCollection, reference } from "astro:content"

const notebooks = defineCollection({
  type: "content", // v2.5.0 and later
  schema: z.object({
    title: z.string(),
    url: z.string().url().optional(),
    githubUrl: z.string().url().optional(),
    googleColabUrl: z.string().url().optional(),
    sha: z.string().optional(),
    date: z.date().optional(),
    excerpt: z.string().optional(),
    tags: z.array(z.string()).optional(),
    author: z.union([reference("authors"), z.undefined()]).optional(),
  }),
})

const authors = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    url: z.string().url().optional(),
  }),
})

const series = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    notebooks: z.array(reference("notebooks")),
  }),
})
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  notebooks,
  authors,
  series,
}
