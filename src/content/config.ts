import { z, defineCollection, reference } from "astro:content"
import { glob, file } from "astro/loaders"
import axios from "axios"
import {
  Requirements,
  Features,
  SeriesCategories,
  SeriesPositions,
  PlanIcons,
  PlanGuest,
  PlanResearcher,
  PlanImpressoUser,
  PlanNone,
  PlanEducational,
} from "../constants"
const CorpusAccessUserPlansToPlan: Record<string, string> = {
  "Guest User Plan": PlanGuest,
  "Basic User Plan": PlanImpressoUser,
  "Student User Plan": PlanEducational,
  "Academic User Plan": PlanResearcher,
  "Not Possible": PlanNone,
}
const datasetMapper = (dataset: any) => {
  return {
    id: [dataset.data_partner_institution, dataset.media_alias].join("-"),
    associatedPartner: dataset.data_partner_institution,
    mediaId: dataset.media_alias,
    mediaTitle: dataset.media_title,
    timePeriod: dataset.time_period,
    startYear: parseInt(dataset.time_period.split("-").shift(), 10),
    endYear: parseInt(dataset.time_period.split("-").pop(), 10),
    media: dataset.media, // e.g. Newspaper
    medium: dataset.medium, // eg Print
    copyright: dataset.copyright_or_copyright_status,
    permittedUse: dataset.permitted_use,
    minimumUserPlanRequiredToExploreInWebapp:
      CorpusAccessUserPlansToPlan[
        dataset.minimum_user_plan_required_to_explore_in_the_webapp
      ],
    minimumUserPlanRequiredToExportTranscripts:
      CorpusAccessUserPlansToPlan[
        dataset.minimum_user_plan_required_to_export_transcripts
      ],
    minimumUserPlanRequiredToExportIllustration:
      CorpusAccessUserPlansToPlan[
        dataset.minimum_user_plan_required_to_export_illustration
      ],
    partnerBitmapIndex: dataset.partner_bitmap_index,
  }
}

const datasets = defineCollection({
  loader: () =>
    axios
      .get(
        "https://raw.githubusercontent.com/impresso/impresso-corpus-metadata/refs/heads/master/data/access_rights_masterfiles/corpus_access_catalogue.json",
        {
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          },
        }
      )
      .then((res) => {
        const response = res.data

        return response.map(datasetMapper)
      })
      .catch((err) => {
        console.error(err, process.env.GITHUB_TOKEN)
        return []
      }),
  schema: z.object({
    id: z.string(),
    associatedPartner: z.string(),
    mediaId: z.string(),
    mediaTitle: z.string(),
    timePeriod: z.string(),
    startYear: z.number(),
    endYear: z.number(),
    media: z.string(),
    medium: z.string(),
    copyright: z.string(),
    permittedUse: z.string(),
    minimumUserPlanRequiredToExploreInWebapp: z.string(),
    minimumUserPlanRequiredToExportTranscripts: z.string(),
    minimumUserPlanRequiredToExportIllustration: z.string(),
    partnerBitmapIndex: z.number(),
  }),
})

const notebooks = defineCollection({
  loader: glob({ pattern: "*.mdx", base: "./src/content/notebooks" }),
  schema: z.object({
    title: z.string().optional(),
    url: z.string().url().optional(),
    langModel: z.string().optional(),
    githubUrl: z.string().url().optional(),
    googleColabUrl: z.string().url().optional(),
    sha: z.string().optional(),
    date: z.date().optional(),
    excerpt: z.string().optional(),
    tags: z.array(z.string()).optional(),
    links: z
      .array(z.object({ label: z.string(), href: z.string().url() }))
      .optional(),
    showLinks: z.boolean().optional(),
    authors: z.array(reference("authors")).optional(),
    // this gives circular reference
    seealso: z.array(z.string()).optional(),
    // seealso: z.array(z.lazy(() => reference("notebooks"))).optional(),
  }),
})

const plans = defineCollection({
  loader: glob({ pattern: "*.mdx", base: "./src/content/plans" }),
  schema: z.object({
    id: z.string().optional(),
    title: z.string(),
    icon: z.string().optional(),
    features: z
      .array(
        z.object({
          ref: z.enum(Features as any).optional(),
          title: z.string().optional(),
          status: z.string().optional(),
          iconColor: z.string().optional(),
          icon: z.enum(PlanIcons as any).optional(),
        })
      )
      .optional(),
    requirements: z.array(z.enum(Requirements as any)),
  }),
})

const authors = defineCollection({
  loader: file("./src/content/authors.yaml"),
  schema: z.object({
    name: z.string(),
    url: z.string().url().optional(),
  }),
})

const associatedPartners = defineCollection({
  loader: glob({ pattern: "*.yaml", base: "./src/content/associatedPartners" }),
  schema: z.object({
    name: z.string(),
    url: z.string().url(),
  }),
})

const series = defineCollection({
  loader: glob({ pattern: "*.mdx", base: "./src/content/series" }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    category: z.array(z.enum(SeriesCategories as any)).optional(),
    position: z.string(z.enum(SeriesPositions as any)).optional(),
    notebooks: z.array(reference("notebooks")),
  }),
})

const pagesContents = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/pagesContents" }),
  schema: z.object({
    title: z.string(),
    modalTitle: z.string().optional(),
    excerpt: z.string().optional(),
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
  pagesContents,
  datasets,
}
