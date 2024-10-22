import { protobuf } from "impresso-jscommons"
import CodeSnippet from "./CodeSnippet"
import "./SearchQuerySnippet.css"

export type SearchQuerySnippetProps = {
  sq: string
  debug: boolean
}

const SearchQuerySnippet = ({ sq, debug = false }: SearchQuerySnippetProps) => {
  const filters = protobuf.searchQuery.deserialize(sq).filters || []
  const value = `from impresso import connect
impresso = connect()
results = impresso.search.find(filters=${JSON.stringify(filters, null, 2)})  
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

      <CodeSnippet value={value} />
    </div>
  )
}

export default SearchQuerySnippet
