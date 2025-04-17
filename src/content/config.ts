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
  NotebookLevels,
  NotebookLevelBeginner,
  Plans,
} from "../constants"

const CorpusAccessUserPlansToPlan: Record<string, string> = {
  "Guest User Plan": PlanGuest,
  "Basic User Plan": PlanImpressoUser,
  "Student User Plan": PlanEducational,
  "Academic User Plan": PlanResearcher,
  "Not Possible": PlanNone,
}

const CorpusAccessToDatasetMapper = (dataset: any) => {
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
        console.log(
          "Reading Corpus Access JSON granted, syncinc contents:",
          res.data.length
        )
        return response.map(CorpusAccessToDatasetMapper)
      })
      .catch((err) => {
        console.error(
          err.message,
          process.env.GITHUB_TOKEN ? "using token: YES" : "without token"
        )
        return [
          CorpusAccessToDatasetMapper({
            data_partner_institution: "SNL",
            media_alias: "BLB",
            media_title: "B\u00fcndner Landbote",
            time_period: "1846-1847",
            media: "Newspaper",
            medium: "print",
            copyright_or_copyright_status: "Public Domain",
            permitted_use: "Personal, Research and Educational",
            minimum_user_plan_required_to_explore_in_the_webapp:
              "Guest User Plan",
            minimum_user_plan_required_to_export_transcripts: "Basic User Plan",
            minimum_user_plan_required_to_export_illustration:
              "Basic User Plan",
            partner_bitmap_index: 5,
          }),
          CorpusAccessToDatasetMapper({
            data_partner_institution: "BCUF",
            media_alias: "FZG",
            media_title: "Freiburger Nachrichten",
            time_period: "1865-2018",
            media: "Newspaper",
            medium: "print",
            copyright_or_copyright_status: "Protected Domain: In copyright",
            permitted_use: "Research and Educational",
            minimum_user_plan_required_to_explore_in_the_webapp:
              "Basic User Plan",
            minimum_user_plan_required_to_export_transcripts:
              "Student User Plan",
            minimum_user_plan_required_to_export_illustration:
              "Student User Plan",
            partner_bitmap_index: 23,
          }),
          CorpusAccessToDatasetMapper({
            data_partner_institution: "BCUL",
            media_alias: "RN",
            media_title: "Bulletins du Grand Conseil",
            time_period: "1829-2020",
            media: "Newspaper",
            medium: "print",
            copyright_or_copyright_status: "Protected Domain: In copyright",
            permitted_use: "Research",
            minimum_user_plan_required_to_explore_in_the_webapp:
              "Academic User Plan",
            minimum_user_plan_required_to_export_transcripts:
              "Academic User Plan",
            minimum_user_plan_required_to_export_illustration:
              "Academic User Plan",
            partner_bitmap_index: 22,
          }),
        ]
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

const DataReleaseCardFromJson = (card: any) => {
  return {
    version: card["Release Version"],
    releaseName: card["Release Name"],
    stats: card["Impresso Corpus Overview"]?.nps_stats,
  }
}

const dataReleaseCard = defineCollection({
  loader: () =>
    axios
      .get(`${process.env.LATEST_DATA_RELEASE_CARD_URL}`, {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      })
      .then((res) => {
        const response = res.data
        console.log(
          "Reading latest Release Card JSON granted, syncinc contents:",
          res.data.length
        )
        return DataReleaseCardFromJson(response)
      })
      .catch((err) => {
        console.error(
          err.message,
          process.env.GITHUB_TOKEN ? "using token: YES" : "without token"
        )
        return {
          version: "0.0.0",
          releaseName: "No Release Name",
          stats: {
            total: 0,
            newspapers: 0,
            articles: 0,
            pages: 0,
            words: 0,
          },
        }
      }),
  schema: z.object({
    version: z.string(),
    releaseName: z.string(),
    stats: z.object({
      total: z.number(),
      newspapers: z.number(),
      articles: z.number(),
      pages: z.number(),
      words: z.number(),
    }),
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
    id: z.string().optional(),
    title: z.string(),
    icon: z.string().optional(),
    plan: z.enum(Plans as any).optional(),
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
  dataReleaseCard,
}
