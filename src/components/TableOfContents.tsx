import { useEffect, useState } from "react"
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
        rootMargin: "-80px 0px -10% 0px",
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

  if (entries.length === 0) {
    return (
      <section
        className={`TableOfContents ${sticky ? "sticky-top" : ""} mt-4 pt-4 ${className}`}
      >
        <h4>{title}</h4>
        <p>No table of contents available.</p>
      </section>
    )
  }

  return (
    <section
      className={`TableOfContents ${sticky ? "sticky-top" : ""} mt-4 pt-4 ${className}`}
    >
      <h4>{title}</h4>
      <ul style={{ listStyle: "none", padding: 0 }}>
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
