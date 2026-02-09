import { z, defineCollection, reference } from "astro:content"
import { glob, file } from "astro/loaders"
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
  NotebookLevels,
  NotebookLevelBeginner,
  Plans,
} from "../constants"
import { toCamelCase } from "../logic"
import { getResourceWithBearerToken } from "./utils"
import type {
  CorpusAccessCatalogueItem,
  DataReleaseCard,
  SpecialMembershipAccessItem,
} from "../types"

const CorpusAccessUserPlansToPlan: Record<string, string> = {
  "Guest User Plan": PlanGuest,
  "Basic User Plan": PlanImpressoUser,
  "Student User Plan": PlanEducational,
  "Academic User Plan": PlanResearcher,
  "Not Possible": PlanNone,
}

const GitHubToken: string = process.env.GITHUB_TOKEN || ""
console.log("[config.ts] - GitHub Token:", GitHubToken.length ? "YES" : "NO")

const CorpusAccessToDatasetMapper = (dataset: CorpusAccessCatalogueItem) => {
  return {
    id: [dataset.data_partner_institution, dataset.media_alias].join("-"),
    associatedPartner: dataset.data_partner_institution,
    mediaId: dataset.media_alias,
    mediaTitle: dataset.media_title,
    timePeriod: dataset.time_period,
    startYear: parseInt(dataset.time_period.split("-").shift() as string, 10),
    endYear: parseInt(dataset.time_period.split("-").pop() as string, 10),
    media: dataset.source_type, // e.g. Newspaper
    medium: dataset.source_medium, // eg Print
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
  loader: (): Promise<SpecialMembershipAccessItem[]> =>
    getResourceWithBearerToken<CorpusAccessCatalogueItem[]>(
      process.env.DATASETS_URL || "",
      GitHubToken,
      "datasets.log.json",
    ).then((data) => data.map(CorpusAccessToDatasetMapper)),
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

const dataReleaseCards = defineCollection({
  loader: (): Promise<DataReleaseCard[]> =>
    Promise.all(
      (process.env.DATA_RELEASE_CARD_URLS || "").split(",").map(async (url) => {
        // id is the last part of the url, e.g. data-release-2025-05/corpus_release_card.json
        const id = url.replace(/^.*\/([^\/]+)\/([^\/]+)$/, "$1/$2")
        const logFile = `dataReleaseCard-${id.split("/").join("-").replace(".json", "")}.log.json`
        return getResourceWithBearerToken<DataReleaseCard>(
          url,
          GitHubToken,
          logFile,
        ).then((data) => {
          const transformedResponse = toCamelCase({
            // id is the last part of the url, e.g. data-release-2025-05/corpus_release_card.json
            ...data,
            id: url.replace(/^.*\/([^\/]+)\/([^\/]+)$/, "$1/$2"),
          })
          if (transformedResponse.impressoCorpusOverview?.mediaStats) {
            transformedResponse.impressoCorpusOverview.npsStats =
              transformedResponse.impressoCorpusOverview.mediaStats
          }
          return transformedResponse
        })
      }),
    ),
  schema: z.object({
    id: z.string(),
    releaseName: z.string(),
    releaseVersion: z.string(),
    impressoCorpusOverview: z.object({
      npsStats: z.object({
        titles: z.number(),
        issues: z.number(),
        pages: z.number(),
        contentItems: z.number(),
        images: z.number(),
        tokens: z.number(),
      }),
    }),
    impressoEnrichments: z.object({
      lingproc: z.object({
        models: z.array(z.any()),
        enrichmentStats: z.any().optional(),
      }),
      langident: z.object({
        models: z.array(z.any()),
        enrichmentStats: z.any().optional(),
      }),
      textreuse: z.object({
        models: z.array(z.any()),
        enrichmentStats: z.any().optional(),
      }),
      entities: z.object({
        models: z.array(z.any()),
        enrichmentStats: z.any().optional(),
      }),
      newsagencies: z.object({
        models: z.array(z.any()),
        enrichmentStats: z.any().optional(),
      }),
      topics: z.object({
        models: z.array(z.any()),
        enrichmentStats: z.any().optional(),
      }),
      ocrqa: z.object({
        models: z.array(z.any()),
        enrichmentStats: z.any().optional(),
      }),
      embImages: z.object({
        models: z.array(z.any()),
        enrichmentStats: z.any().optional(),
      }),
      embDocs: z.object({
        models: z.array(z.any()),
        enrichmentStats: z.any().optional(),
      }),
    }),
  }),
})

const notebooks = defineCollection({
  loader: glob({ pattern: "*.mdx", base: "./src/content/notebooks" }),
  schema: z.object({
    title: z.string().optional(),
    draft: z.boolean().optional(),
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
    // note: this prevents circular reference
    // BEFORE: seealso: z.array(z.lazy(() => reference("notebooks"))).optional(),
    seealso: z.array(z.string()).optional(),
    // levels
    levels: z
      .object({
        coding: z.enum(NotebookLevels as any).default(NotebookLevelBeginner),
        method: z.enum(NotebookLevels as any).default(NotebookLevelBeginner),
      })
      .default({
        coding: NotebookLevelBeginner,
        method: NotebookLevelBeginner,
      }),
    // seealso: z.array(z.lazy(() => reference("notebooks"))).optional(),
  }),
})

const plans = defineCollection({
  loader: glob({ pattern: "*.mdx", base: "./src/content/plans" }),
  schema: z.object({
    title: z.string(),
    icon: z.string().optional(),
    // this is the plan identifier (group name in django) used in the PlanCard component
    // it should match the PlanGuest, PlanImpressoUser, PlanEducational, PlanResearcher constants
    // in src/constants.ts
    name: z.enum(Plans as any),
    ordering: z.number().min(0).optional().default(0),
    features: z
      .array(
        z.object({
          ref: z.enum(Features as any).optional(),
          title: z.string().optional(),
          status: z.string().optional(),
          iconColor: z.string().optional(),
          icon: z.enum(PlanIcons as any).optional(),
        }),
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

const dataProviders = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/dataProviders" }),
  schema: z.object({
    title: z.string(),
    acronym: z.string(),
    type: z.string(),
    provider: z.string(),
    links: z
      .array(
        z.object({
          label: z.string(),
          url: z.string().url(),
          access: z.string().optional(),
        }),
      )
      .optional(),
    Reference: z.string().optional(),
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
  dataReleaseCards,
  dataProviders,
}
