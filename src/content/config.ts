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
    authors: z.array(reference("authors")).optional(),
    // this gives circular reference
    seealso: z.array(z.string()).optional(),
    // seealso: z.array(z.lazy(() => reference("notebooks"))).optional(),
  }),
})

const plans = defineCollection({
  type: "content",
  schema: z.object({
    id: z.string().optional(),
    title: z.string(),
    icon: z.string().optional(),
    features: z
      .array(
        z.object({
          title: z.string(),
          status: z.string(),
          iconColor: z.string(),
        }),
      )
      .optional(),
    requirements: z
      .array(
        z.object({
          title: z.string(),
          status: z.string(),
          iconColor: z.string(),
        }),
      )
      .optional(),
  }),
})

const authors = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    url: z.string().url().optional(),
  }),
})

const associatedPartners = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    url: z.string().url(),
  }),
})

const series = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    notebooks: z.array(reference("notebooks")),
  }),
})
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  notebooks,
  authors,
  series,
  associatedPartners,
  plans,
}
