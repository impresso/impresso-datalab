# AGENTS.md

This file provides guidance to AI coding agents when working with code in this repository.

## Project Overview

Impresso Datalab is a modern static website that enables users:

- to explore the available API documentation for the Impresso Public API and its Impresso Python Library wrapper
- to get a API specific authentication token for both the API and the Impresso Python Library
- to explore a list of available Jupyter Notebooks that demonstrate how to use the API and the Python Library

## Technology Stack

This project is a fully TypeScript website built with:

- Astro (islands architecture, server-first)
- React (for interactive islands)
- Vue (for interactive islands that includes code from the impresso-ui-components javascript library)

It connects to a FeathersJS API backend via websockets to authenticate the user or to get current feathersjs token from the local storage.
Note that the feathersJS token is not the same as the API key, but it is used to get it from the API backend.

## Coding Guidelines

When working on this project, please adhere to the following guidelines:

- Follow the existing code style and conventions used in the project.
- use css vars whenever possible, for example `var(--impresso-border-radius-sm);`. The list of css vars available is in the `src/styles/global.css` file.
- Ensure that any new code is well-documented and includes comments where necessary. Always use interface definition for every component props and function parameters.
- Write unit tests for any new functionality you add, and ensure that all existing tests pass before submitting your changes.

## adding or editing AstroJS Content Collections

When adding new AstroJS Content Collection, please follow these guidelines:

- store contents inside /src/content folder and zod definition inside /src/content/config.ts file
- use md files for markdown content

We also use AstroJS content pages to serve markdown files through JSON APIs. When adding a new content collection served through JSON endpoints, follow these steps:

For operational updates of existing JSON content collections, use `npm run update-data-release-cards` and `npm run update-datasets` (implemented in `scripts/updateDataReleaseCards.ts` and `scripts/updateDatasets.ts`). These scripts rely on `GITHUB_TOKEN`, `DATA_RELEASE_CARD_URLS`, and `DATASETS_URL`, and write updated files under `src/content/`.
There is also a manual GitHub Actions workflow in `.github/workflows/update-content-collections.yml` using `workflow_dispatch`, which runs both scripts and auto-commits changes.

### 1. Add the collection definition to `/src/content/config.ts`

Define your collection with `glob` loader and appropriate Zod schema:

```ts
const myCollection = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/myCollection" }),
  schema: z.object({
    title: z.string(),
    // ... add other required and optional fields
  }),
})

export const collections = {
  // ... existing collections
  myCollection,
}
```

### 2. Create a list endpoint at `/src/pages/contents/[collection].json.ts`

This serves all items in the collection:

```ts
import { getCollection } from "astro:content"

export async function GET() {
  const collection = await getCollection("nameOfTheContentCollection")
  return new Response(
    JSON.stringify(
      collection.map((entry) => ({
        slug: entry.slug,
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
```

### 3. Create a dynamic detail endpoint at `/src/pages/contents/[collection]/[slug].json.ts`

This serves individual items with rendered HTML content:

```ts
import { getCollection } from "astro:content"

export async function getStaticPaths() {
  const collection = await getCollection("nameOfTheContentCollection")
  return collection.map((entry) => ({
    params: { slug: entry.slug },
    props: { entry },
  }))
}

interface Props {
  entry: Awaited<
    ReturnType<typeof getCollection<"nameOfTheContentCollection">>
  >[number]
}

export async function GET({ props }: { props: Props }) {
  const { entry } = props
  const body = await entry.render()

  return new Response(
    JSON.stringify({
      slug: entry.slug,
      ...entry.data,
      content: body.html,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  )
}
```

This pattern provides:

- `/contents/mycollection.json` - Returns array of all items with metadata
- `/contents/mycollection/[slug].json` - Returns individual item with rendered HTML content

## React components

When working on React components, please follow these guidelines:

- to render markdown content, use the `MarkdownSnippet` component with the `value` prop. The `content` prop is deprecated and should not be used.
