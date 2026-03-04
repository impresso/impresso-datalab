import React from "react"
import { Pagination } from "react-bootstrap"
import "./SearchPagination.css"

export interface SearchPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  /**  How many pages to show around the current one */
  maxVisible?: number
  className?: string
}

const SearchPagination: React.FC<SearchPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisible = 2,
  className = "",
}) => {
  if (totalPages <= 1) return null

  const items = []

  // Helper to add a page item
  const addPage = (num: number) => {
    items.push(
      <Pagination.Item
        key={num}
        active={num === currentPage}
        onClick={() => onPageChange(num)}
      >
        {num}
      </Pagination.Item>,
    )
  }

  for (let i = 1; i <= totalPages; i++) {
    // Always show first and last page
    // Otherwise, only show pages within the 'maxVisible' range of the current page
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - maxVisible && i <= currentPage + maxVisible)
    ) {
      addPage(i)
    }
    // Add ellipses if there is a gap
    else if (
      i === currentPage - maxVisible - 1 ||
      i === currentPage + maxVisible + 1
    ) {
      items.push(<Pagination.Ellipsis key={`ell-${i}`} disabled />)
    }
  }

  return (
    <div className={`SearchPagination ${className}`}>
      <Pagination>
        <Pagination.First
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        />
        <Pagination.Prev
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />

        {items}

        <Pagination.Next
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
        <Pagination.Last
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </div>
  )
}

export default SearchPagination
