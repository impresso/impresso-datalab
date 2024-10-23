import { protobuf } from "impresso-jscommons"
import CodeSnippet from "./CodeSnippet"
import "./SearchQuerySnippet.css"

type FilterObject = {
  type: string
  op?: string
  precision?: string
  q?: string[] | string
}

function generateKwargs(objects: FilterObject[]): any[] {
  const kwargs = objects.map((obj) => {
    // Handle "hasTextContents" type
    if (!obj.q) {
      return `${obj.type}=True`
    }
    // Handle cases where 'q' is a list of items (e.g., string, newspaper, person, etc.)
    else if (Array.isArray(obj.q)) {
      if (obj.q.length > 1) {
        return `${obj.type}=${obj.op}(${obj.q.map((item) => `"${item}"`).join(", ")})`
      }
      return `${obj.type}="${obj.q[0]}"`
    }
    // Handle daterange as a tuple
    else if (obj.type === "daterange" && typeof obj.q === "string") {
      const dateRange = obj.q.split(" TO ")
      return `${obj.type}=("${dateRange[0]}", "${dateRange[1]}")`
    }
    // Handle single string values (e.g., language, country, type, etc.)
    else if (typeof obj.q === "string") {
      return `${obj.type}="${obj.q}"`
    }
    return false
  })

  return kwargs.filter((kwarg) => kwarg)
}

export type SearchQuerySnippetProps = {
  sq: string
  debug?: boolean
}

const SearchQuerySnippet = ({ sq, debug = false }: SearchQuerySnippetProps) => {
  let filters: FilterObject[] = []

  try {
    filters = protobuf.searchQuery.deserialize(sq).filters || []
  } catch (e) {
    console.error(e)
  }
  const value = `from impresso import connect

impresso = connect()

results = impresso.search.find(\n  ${generateKwargs(filters).join(",\n  ")}\n)  
`

  return (
    <div className="shadow-sm p-3 SearchQuerySnippet">
      {debug && (
        <>
          <h2>Search Query</h2>
          <pre>{sq}</pre>
          <h3>Filters</h3>
          <ul>
            {filters.map((f, i) => (
              <li key={i}>
                <strong>{f.type}</strong>: {JSON.stringify(f)}
              </li>
            ))}
          </ul>
        </>
      )}
      <p className="small">
        You can use this code to initialize a Ipynb notebook and work with the
        metadata of your search results in Python.
      </p>
      <CodeSnippet value={value} readonly />
    </div>
  )
}

export default SearchQuerySnippet
