import { Container, Row, Col } from "react-bootstrap"
import Page from "./Page"
import SearchQuerySnippet from "./SearchQuerySnippet"
import { useEffect, useState } from "react"
import { protobuf } from "impresso-jscommons"
import Alert from "./Alert"

export type SearchQuerySnippetModalProps = {
  sq?: string
  debug?: boolean
}

const SearchQuerySnippetModal: React.FC<SearchQuerySnippetModalProps> = ({
  sq = "",
  debug = false,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [error, setError] = useState<string>("")
  const appSearchHref = `/app/search?sq=${searchQuery}`

  const checkSearchQueryValidity = (sq: string) => {
    try {
      protobuf.searchQuery.deserialize(sq)
      setError("")
      setSearchQuery(sq)
    } catch (e) {
      console.error(e)
      setError("Invalid search query")
    }
  }

  useEffect(() => {
    if (sq) {
      checkSearchQueryValidity(sq)
      return
    }
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.has("sq")) {
      const _sq = urlParams.get("sq") ?? ""
      // check that the search query is valid. add error if not
      checkSearchQueryValidity(_sq)
    }
  }, [sq])

  return (
    <Page
      title="Work with your search query - Impresso Datalab"
      fullscreen="xl-down"
      size="xl"
    >
      <Container>
        <Row>
          <h1 className="my-3">Work with your search query</h1>
        </Row>
        <Row>
          <Col md={6}>
            {error && <Alert className="p-3 mb-3">{error}</Alert>}
            {searchQuery.length > 0 ? (
              <>
                <p>
                  Use the following code snippet to work with your search query
                  in Python. You can go back to the{" "}
                  <a href="/app/search">search query page</a> of the Impresso
                  app to modify the search query.
                </p>
                <a
                  className="btn btn-secondary d-inline-block w-auto"
                  href={appSearchHref}
                >
                  See results in Impresso App
                </a>
              </>
            ) : (
              <p>
                No search query found. Please go back to the{" "}
                <a href="/app/search">search query page</a> of the Impresso app
                to generate a search query.
              </p>
            )}
          </Col>
          <Col md={6}>
            <SearchQuerySnippet sq={searchQuery} debug={debug} />
          </Col>
        </Row>
      </Container>
    </Page>
  )
}

export default SearchQuerySnippetModal
