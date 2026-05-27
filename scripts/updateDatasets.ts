import { resolve } from "node:path"
import {
  getResourceWithBearerToken,
  getEnvVariables,
  projectRoot,
} from "./utils"
import type { CorpusAccessCatalogueItem } from "../src/types"
import {
  PlanGuest,
  PlanResearcher,
  PlanImpressoUser,
  PlanNone,
  PlanEducational,
} from "../src/constants"
import { writeFileSync } from "node:fs"

const { DATASETS_URL, GITHUB_TOKEN } = getEnvVariables([
  "DATASETS_URL",
  "GITHUB_TOKEN",
])

console.log("DATASETS_URL:", DATASETS_URL)
console.log(
  "GITHUB_TOKEN:",
  GITHUB_TOKEN ? "***** [Provided]" : "[Not provided]",
)

const CorpusAccessUserPlansToPlan: Record<string, string> = {
  "Guest User Plan": PlanGuest,
  "Basic User Plan": PlanImpressoUser,
  "Student User Plan": PlanEducational,
  "Academic User Plan": PlanResearcher,
  "Not Possible": PlanNone,
}

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

async function fetchDatasets() {
  console.info("Starting datasets update script...")
  console.info("Fetching datasets from:", DATASETS_URL)
  const filename = "datasets.json"
  const logFilepath = resolve(
    projectRoot,
    "logs",
    `dataReleaseCard-${filename}.log.json`,
  )
  const datasetsFilepath = resolve(projectRoot, "src/content/datasets.json")

  try {
    const datasets = await getResourceWithBearerToken<
      CorpusAccessCatalogueItem[]
    >(DATASETS_URL, GITHUB_TOKEN, logFilepath)
    const mappedDatasets = datasets
      .map(CorpusAccessToDatasetMapper)
      .map((d) => {
        const id = d.id + "-" + d.timePeriod
        return { ...d, id }
      })
    // write to src/content/datasets.json
    writeFileSync(
      datasetsFilepath,
      JSON.stringify(mappedDatasets, null, 2),
      "utf-8",
    )
    console.info(
      `Datasets fetched successfully. Total datasets: ${datasets.length}`,
    )
  } catch (error) {
    console.error("Error fetching datasets:", error)
    process.exit(1)
  }
}

fetchDatasets()
