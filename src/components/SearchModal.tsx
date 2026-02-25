import React, { useState, useEffect, useRef } from "react"
import {
  Container,
  Row,
  Col,
  Pagination,
  Spinner,
  ListGroup,
  Badge,
} from "react-bootstrap"
import Page from "./Page"

interface PagefindResult {
  url: string
  excerpt: string
  word_count: number
  filters: {
    contentCollection?: string[]
    tag?: string[]
  }
  meta: {
    title: string
    [key: string]: any
  }
}

const PAGE_SIZE = 10

const SearchModal: React.FC = () => {
  const [query, setQuery] = useState("")
  const [allRawResults, setAllRawResults] = useState<any[]>([])
  const [pagedResults, setPagedResults] = useState<PagefindResult[]>([])
  const [availableFilters, setAvailableFilters] = useState<
    Record<string, Record<string, number>>
  >({})
  const [selectedCollection, setSelectedCollection] = useState<string | null>(
    null,
  )
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const pagefind = useRef<any>(null)

  useEffect(() => {
    const initPagefind = () => {
      if ((window as any).pagefind) {
        pagefind.current = (window as any).pagefind
        setIsReady(true)
      }
    }
    initPagefind()
    window.addEventListener("pagefind-ready", initPagefind)
    return () => window.removeEventListener("pagefind-ready", initPagefind)
  }, [])

  useEffect(() => {
    if (!isReady) return

    const fetchResults = async () => {
      setLoading(true)
      const searchTerm = query.length > 1 ? query : null

      const searchOptions: any = {
        filters: selectedCollection
          ? { contentCollection: selectedCollection }
          : {},
      }

      const search = await pagefind.current.search(searchTerm, searchOptions)
      console.debug("search results", search)
      setAvailableFilters(search.filters)
      setAllRawResults(search.results)
      setCurrentPage(1)
      setLoading(false)
    }

    const handler = setTimeout(fetchResults, 300)
    return () => clearTimeout(handler)
  }, [query, isReady, selectedCollection])

  useEffect(() => {
    const hydratePage = async () => {
      if (allRawResults.length === 0) {
        setPagedResults([])
        return
      }
      setLoading(true)
      const start = (currentPage - 1) * PAGE_SIZE
      const end = start + PAGE_SIZE
      const batch = allRawResults.slice(start, end)
      const dataResults = await Promise.all(batch.map((r: any) => r.data()))
      setPagedResults(dataResults as PagefindResult[])
      setLoading(false)
    }
    hydratePage()
  }, [allRawResults, currentPage])

  const totalPages = Math.ceil(allRawResults.length / PAGE_SIZE)

  return (
    <Page title="Search - Impresso Datalab" fullscreen="xl-down" size="xl">
      <Container>
        <Row>
          <Col md={3}>
            <h4>Collections</h4>
            <ListGroup>
              <ListGroup.Item
                action
                active={selectedCollection === null}
                onClick={() => setSelectedCollection(null)}
              >
                All
              </ListGroup.Item>
              {availableFilters.contentCollection &&
                Object.entries(availableFilters.contentCollection).map(
                  ([name, count]) => (
                    <ListGroup.Item
                      key={name}
                      action
                      active={selectedCollection === name}
                      onClick={() => setSelectedCollection(name)}
                    >
                      {name} ({count})
                    </ListGroup.Item>
                  ),
                )}
            </ListGroup>
          </Col>

          <Col md={9}>
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            {loading && <Spinner animation="border" size="sm" />}

            {pagedResults.length > 0 ? (
              <>
                <p>{allRawResults.length} results</p>
                <div>
                  {pagedResults.map((res, i) => (
                    <div key={i} style={{ marginBottom: "20px" }}>
                      <a href={res.url}>
                        <h5>{res.meta.title}</h5>
                      </a>
                      <p dangerouslySetInnerHTML={{ __html: res.excerpt }} />
                      <small>
                        {res.url} | {res.word_count} words
                      </small>
                      <div>
                        {res.filters.tag?.map((t) => (
                          <Badge
                            key={t}
                            bg="secondary"
                            style={{ marginRight: "5px" }}
                          >
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <Pagination>
                    <Pagination.Prev
                      onClick={() => setCurrentPage((p) => p - 1)}
                      disabled={currentPage === 1}
                    />
                    <Pagination.Item active>{currentPage}</Pagination.Item>
                    <Pagination.Next
                      onClick={() => setCurrentPage((p) => p + 1)}
                      disabled={currentPage === totalPages}
                    />
                  </Pagination>
                )}
              </>
            ) : (
              !loading && <p>No results found.</p>
            )}
          </Col>
        </Row>
      </Container>
    </Page>
  )
}

export default SearchModal
