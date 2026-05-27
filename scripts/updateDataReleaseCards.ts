import { resolve } from "node:path"
import {
  getResourceWithBearerToken,
  getEnvVariables,
  projectRoot,
  toCamelCase,
} from "./utils"
import type { DataReleaseCard } from "../src/types"
import { writeFileSync } from "node:fs"

const { DATA_RELEASE_CARD_URLS, GITHUB_TOKEN } = getEnvVariables([
  "DATA_RELEASE_CARD_URLS",
  "GITHUB_TOKEN",
])

const dataReleaseCardsDirectory = resolve(
  projectRoot,
  "src/content/dataReleaseCards",
)

console.info("Environment variables loaded successfully:")
console.info("DATA_RELEASE_CARD_URLS:", DATA_RELEASE_CARD_URLS)
console.log(
  "GITHUB_TOKEN:",
  GITHUB_TOKEN ? "***** [Provided]" : "[Not provided]",
)

console.log("dataReleaseCardsDirectory:", dataReleaseCardsDirectory)

async function fetchDataReleaseCards() {
  console.info("Starting data release cards update script...")
  console.info(
    "Using the following URLs:",
    DATA_RELEASE_CARD_URLS.split(",").map((url) => url.trim()),
  )
  const urls = DATA_RELEASE_CARD_URLS.split(",")
    .map((url) => url.trim())
    .filter((url) => url.endsWith(".json"))

  // get filenames from the urls, assuming they end with .json
  console.info("Extracting filenames from URLs...")
  const dataReleaseCards: DataReleaseCard[] = []
  // fetch data from each url and write to a separate file in src/content/dataReleaseCards

  for (const url of urls) {
    console.log(`Processing URL: ${url}`)
    try {
      const tagMatch = url.match(/refs\/tags\/([^/]+)/)
      const tag = tagMatch ? tagMatch[1] : "latest"
      const filename = tag + "-" + url.split("/").pop()

      const filepath = resolve(dataReleaseCardsDirectory, filename)
      const rawFilepath = resolve(
        projectRoot,
        "logs",
        `dataReleaseCard-${filename}.log.json`,
      )
      console.info(`Fetching data release card from ${url} to ${filepath}...`)
      const data = await getResourceWithBearerToken<DataReleaseCard>(
        url,
        GITHUB_TOKEN,
        rawFilepath,
      )
      const transformedResponse = toCamelCase({
        // id is the last part of the url, e.g. data-release-2025-05/corpus_release_card.json
        ...data,
        id: url.replace(/^.*\/([^\/]+)\/([^\/]+)$/, "$1/$2"),
      })
      if (transformedResponse.impressoCorpusOverview?.mediaStats) {
        transformedResponse.impressoCorpusOverview.npsStats =
          transformedResponse.impressoCorpusOverview.mediaStats
      }
      writeFileSync(
        filepath,
        JSON.stringify(transformedResponse, null, 2),
        "utf-8",
      )
      console.info(`Successfully fetched data release card from ${url}`)
    } catch (error) {
      console.error(`Error fetching data release card from ${url}:`, error)
    }
  }
  return dataReleaseCards
}

fetchDataReleaseCards().catch((error) => {
  console.error("Error fetching data release cards:", error)
})
