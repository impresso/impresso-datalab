import React, { useState, useEffect, useRef, useMemo } from "react"
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
import SearchPagination from "./SearchPagination"
import SearchSummary from "./SearchSummary"
import "./SearchModal.css"

interface PagefindResult {
  url: string
  excerpt: string
  word_count: number
  filters: Record<string, string[]>
  meta: { title: string; [key: string]: any }
}

const PAGE_SIZE = 10
// Define the filters we want to display in the sidebar
const FILTER_CONFIG = [
  { key: "contentCollection", label: "Type of content" },
  { key: "series", label: "Series" },
  { key: "tag", label: "Tags" },
]

const SearchModal: React.FC = () => {
  const [query, setQuery] = useState("")
  const [allRawResults, setAllRawResults] = useState<any[]>([])
  const [pagedResults, setPagedResults] = useState<PagefindResult[]>([])
  const [availableFilters, setAvailableFilters] = useState<
    Record<string, Record<string, number>>
  >({})

  // Consolidate filters into one object: { tag: "value", series: "value" }
  const [activeFilters, setActiveFilters] = useState<
    Record<string, string | null>
  >({
    contentCollection: null,
    series: null,
    tag: null,
  })

  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const pagefind = useRef<any>(null)

  // Initialization
  useEffect(() => {
    const init = () => {
      if ((window as any).pagefind) {
        pagefind.current = (window as any).pagefind
        setIsReady(true)
      }
    }
    init()
    window.addEventListener("pagefind-ready", init)
    return () => window.removeEventListener("pagefind-ready", init)
  }, [])

  // Search Logic
  useEffect(() => {
    if (!isReady) return

    const fetchResults = async () => {
      setLoading(true)

      const filters = Object.fromEntries(
        Object.entries(activeFilters),
        // Clean up filters: remove null values
        ////  .filter(([_, v]) => v !== null),
      ) as Record<string, string>

      const search = await pagefind.current.search(
        query.length > 1 ? query : null,
        { filters },
      )
      const searchFilters = await pagefind.current.filters()
      setAvailableFilters(searchFilters)
      setAllRawResults(search.results)
      setCurrentPage(1)
      setLoading(false)
    }

    const handler = setTimeout(fetchResults, 300)
    return () => clearTimeout(handler)
  }, [query, isReady, activeFilters])

  // Pagination Logic
  useEffect(() => {
    const hydratePage = async () => {
      if (allRawResults.length === 0) return setPagedResults([])
      setLoading(true)
      const batch = allRawResults.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE,
      )
      const dataResults = await Promise.all(batch.map((r: any) => r.data()))
      setPagedResults(dataResults as PagefindResult[])
      setLoading(false)
    }
    hydratePage()
  }, [allRawResults, currentPage])

  const totalPages = Math.ceil(allRawResults.length / PAGE_SIZE)

  // Helper to update a single filter
  const toggleFilter = (key: string, value: string | null) => {
    setActiveFilters((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <Page title="Search - Impresso Datalab" fullscreen="xl-down" size="xl">
      <Container className="SearchModal">
        <Row className="mb-2 mb-md-4">
          {/* Sidebar Filters */}
          <Col md={3}>
            {FILTER_CONFIG.map(({ key, label }) => (
              <React.Fragment key={key}>
                <h4 className="mt-4 small-caps-bold">{label}</h4>
                <ListGroup>
                  <ListGroup.Item
                    action
                    active={activeFilters[key] === null}
                    onClick={() => toggleFilter(key, null)}
                  >
                    <span>All {label.toLowerCase()}</span>
                  </ListGroup.Item>
                  {availableFilters[key] &&
                    Object.entries(availableFilters[key]).map(
                      ([name, count]) => (
                        <ListGroup.Item
                          key={name}
                          action
                          active={activeFilters[key] === name}
                          onClick={() => toggleFilter(key, name)}
                        >
                          <span>
                            {name} ({count})
                          </span>
                        </ListGroup.Item>
                      ),
                    )}
                </ListGroup>
              </React.Fragment>
            ))}
          </Col>

          {/* Search Results */}
          <Col md={9}>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            {loading && (
              <Spinner animation="border" size="sm" className="mb-2" />
            )}
            <SearchSummary
              totalResults={allRawResults.length}
              query={query}
              activeFilters={activeFilters}
              onClearQuery={() => setQuery("")}
              onClearFilter={(key) => toggleFilter(key, null)}
              className="mt-3"
            />
            {pagedResults.length > 0 ? (
              <>
                {pagedResults.map((res, i) => (
                  <div key={i} className="mb-4 border-bottom pb-3">
                    <a href={res.url} className="text-decoration-none">
                      <h5 className="mb-1">{res.meta.title}</h5>
                    </a>
                    <p
                      className="mb-1 small"
                      dangerouslySetInnerHTML={{ __html: res.excerpt }}
                    />
                    <div className="d-flex align-items-center gap-2 flex-wrap">
                      <small className="text-muted">
                        {res.word_count} words
                      </small>
                      {res.filters.tag?.map((t) => (
                        <Badge
                          key={t}
                          bg="light"
                          text="dark"
                          className="border"
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              !loading && (
                <p className="mt-3">No results found for your criteria.</p>
              )
            )}
          </Col>
        </Row>
      </Container>
      {totalPages > 1 && (
        <SearchPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => {
            setCurrentPage(page)
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
          className="justify-content-center mt-4 position-sticky bottom-0"
        />
      )}
    </Page>
  )
}

export default SearchModal
