import React from "react"
import { Badge, Button } from "react-bootstrap"
import { Xmark } from "iconoir-react" // Or use a text "×" if you don't have icons

interface SearchSummaryProps {
  totalResults: number
  query: string
  activeFilters: Record<string, string | null>
  onClearQuery: () => void
  onClearFilter: (key: string) => void
  className?: string
}

const SearchSummary: React.FC<SearchSummaryProps> = ({
  totalResults,
  query,
  activeFilters,
  onClearQuery,
  onClearFilter,
  className = "",
}) => {
  // Check if we have anything to show
  const hasQuery = query.length > 1
  const hasFilters = Object.values(activeFilters).some((v) => v !== null)

  if (!hasQuery && !hasFilters && totalResults === 0) return null

  return (
    <div
      className={`d-flex flex-wrap align-items-center gap-2 mb-3 ${className}`}
    >
      <span className="text-muted me-1">
        <strong>{totalResults}</strong>{" "}
        {totalResults === 1 ? "result" : "results"}
      </span>

      {/* Query Chip */}
      {hasQuery && (
        <Badge
          bg="primary"
          className="d-flex align-items-center gap-2 py-2 px-3 rounded-pill"
        >
          Search: "{query}"
          <Xmark role="button" onClick={onClearQuery} />
        </Badge>
      )}

      {/* Filter Chips */}
      {Object.entries(activeFilters).map(([key, value]) => {
        if (!value) return null
        return (
          <Badge
            key={key}
            bg="transparent"
            className="d-flex align-items-center gap-1 py-1 ps-3 rounded-pill border border-dark text-dark"
          >
            {key}: {value}
            <Xmark role="button" onClick={() => onClearFilter(key)} />
          </Badge>
        )
      })}

      {(hasQuery || hasFilters) && (
        <Button
          variant="link"
          size="sm"
          className="text-decoration-none p-0 ms-1"
          onClick={() => {
            onClearQuery()
            Object.keys(activeFilters).forEach(onClearFilter)
          }}
        >
          Clear filters
        </Button>
      )}
    </div>
  )
}

export default SearchSummary
