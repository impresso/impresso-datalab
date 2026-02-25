import React, { useState, useEffect, useRef } from "react"
import { Container, Row, Pagination, Spinner } from "react-bootstrap"
import Page from "./Page"

interface PagefindResult {
  url: string
  excerpt: string
  meta: {
    title: string
    [key: string]: any
  }
}

const PAGE_SIZE = 10

const SearchModal: React.FC = () => {
  const [query, setQuery] = useState("")
  const [allRawResults, setAllRawResults] = useState<any[]>([]) // Store the raw refs
  const [pagedResults, setPagedResults] = useState<PagefindResult[]>([]) // Store the hydrated data
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const pagefind = useRef<any>(null)

  // 1. Initialization (Same as before)
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

  // 2. Fetching the Result List (Raw)
  useEffect(() => {
    if (!isReady) return

    const fetchResults = async () => {
      setLoading(true)
      // If query is empty/short, search(null) returns all indexed pages
      const searchTerm = query.length > 1 ? query : null
      const search = await pagefind.current.search(searchTerm)

      setAllRawResults(search.results)
      setCurrentPage(1) // Reset to page 1 on new search
      setLoading(false)
    }

    const handler = setTimeout(fetchResults, 300)
    return () => clearTimeout(handler)
  }, [query, isReady])

  // 3. Hydration Logic (Pagination)
  useEffect(() => {
    const hydratePage = async () => {
      if (allRawResults.length === 0) {
        setPagedResults([])
        return
      }

      setLoading(true)
      const start = (currentPage - 1) * PAGE_SIZE
      const end = start + PAGE_SIZE

      // Only hydrate the slice we need
      const batch = allRawResults.slice(start, end)
      const dataResults = await Promise.all(batch.map((r: any) => r.data()))

      setPagedResults(dataResults)
      setLoading(false)
    }

    hydratePage()
  }, [allRawResults, currentPage])

  const totalPages = Math.ceil(allRawResults.length / PAGE_SIZE)

  return (
    <Page title="Search - Impresso Datalab" fullscreen="xl-down" size="xl">
      <Container>
        <Row className="mb-4">
          <div className="position-relative">
            <input
              type="text"
              className="form-control"
              placeholder={
                isReady
                  ? "Search or leave empty to browse all..."
                  : "Initializing..."
              }
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {loading && (
              <div className="position-absolute top-50 end-0 translate-middle-y me-3">
                <Spinner animation="border" size="sm" variant="secondary" />
              </div>
            )}
          </div>
        </Row>

        <Row>
          {pagedResults.length > 0 ? (
            <>
              <p className="text-muted small">
                Showing {pagedResults.length} of {allRawResults.length} results
              </p>

              <div className="list-group mb-4">
                {pagedResults.map((res, i) => (
                  <a
                    key={i}
                    href={res.url}
                    className="list-group-item list-group-item-action"
                  >
                    <h5 className="mb-1">{res.meta.title}</h5>
                    <p
                      className="mb-1 small text-muted"
                      dangerouslySetInnerHTML={{ __html: res.excerpt }}
                    />
                    <small className="text-primary">{res.url}</small>
                    {JSON.stringify(res)}
                  </a>
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination className="justify-content-center">
                  <Pagination.Prev
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                  />
                  {[...Array(totalPages)].map((_, i) => (
                    // Simple logic: only show nearby pages if totalPages is huge
                    <Pagination.Item
                      key={i + 1}
                      active={i + 1 === currentPage}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                  />
                </Pagination>
              )}
            </>
          ) : (
            !loading && (
              <p className="text-center py-5 text-muted">
                No results found matching "{query}"
              </p>
            )
          )}
        </Row>
      </Container>
    </Page>
  )
}

export default SearchModal
