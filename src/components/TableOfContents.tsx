import { useEffect, useRef, useState } from "react"
import type { TOCEntry } from "../types"
import "./TableOfContents.css"

interface TableOfContentsProps {
  entries: TOCEntry[]
  sticky?: boolean
  className?: string
  title?: string
}

const TableOfContents: React.FC<TableOfContentsProps> = ({
  entries,
  sticky = true,
  className = "",
  title = "Table of Contents",
}) => {
  const [activeIds, setActiveIds] = useState<Set<string>>(new Set())

  const [listMaxHeight, setListMaxHeight] = useState<number | null>(null)
  const listRef = useRef<HTMLUListElement | null>(null)
  const isCurrentlyScrolled = useRef(false)

  useEffect(() => {
    if (entries.length === 0) return

    const observer = new IntersectionObserver(
      (observedEntries) => {
        setActiveIds((prev) => {
          const newActiveIds = new Set(prev)
          observedEntries.forEach((entry) => {
            if (entry.isIntersecting) {
              newActiveIds.add(entry.target.id)
            } else {
              newActiveIds.delete(entry.target.id)
            }
          })
          return newActiveIds
        })
      },
      {
        rootMargin: "-80px 0px -35% 0px",
        threshold: [0, 1],
      },
    )

    // Observe all heading elements
    entries.forEach((entry) => {
      const element = document.getElementById(entry.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [entries])

  useEffect(() => {
    const updateListMaxHeight = () => {
      const listEl = listRef.current
      if (!listEl) return
      const maxAvailableHeight = window.innerHeight || 0
      if (maxAvailableHeight === 0) return

      const newMaxHeight = maxAvailableHeight - 200 // leave some space for header/footer and potential margins

      setListMaxHeight(newMaxHeight > 100 ? newMaxHeight : null)
    }

    const updateOverflow = () => {
      const listEl = listRef.current

      if (!listEl) return

      const isNowScrolled = listEl.scrollTop > 0

      if (isNowScrolled !== isCurrentlyScrolled.current) {
        isCurrentlyScrolled.current = isNowScrolled
      }
      // update element classname based on scroll state to show/hide top border, without triggering state cha nge
      if (isNowScrolled) {
        listEl.classList.add("scrolled")
      } else {
        listEl.classList.remove("scrolled")
      }
    }

    const element = listRef.current
    if (!element) return undefined

    element.addEventListener("scroll", updateOverflow, { passive: true })
    window.addEventListener("resize", updateListMaxHeight)
    updateListMaxHeight()
    updateOverflow()

    return () => {
      element.removeEventListener("scroll", updateOverflow)
      window.removeEventListener("resize", updateListMaxHeight)
    }
  }, [entries])

  if (entries.length === 0) {
    return (
      <section
        className={`TableOfContents ${sticky ? "sticky-top" : ""} ${className}`}
      >
        <h4>{title}</h4>
        <p>No table of contents available.</p>
      </section>
    )
  }

  return (
    <section
      className={`TableOfContents ${sticky ? "sticky-top" : ""} ${className}`}
    >
      <h4 className="pb-2">{title}</h4>
      <ul
        ref={listRef}
        className="list-unstyled border-bottom me-2 ps-2 position-absolute"
        style={{
          maxHeight: listMaxHeight ? `${listMaxHeight}px` : "none",
          overflowY: "auto",
        }}
      >
        {entries.map((entry, index) => (
          <li key={index} className={`ms-${(entry.level - 2) * 3}`}>
            <a
              href={`#${entry.id}`}
              className={`toc-link ${activeIds.has(entry.id) ? "active" : ""}`}
            >
              {entry.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default TableOfContents
