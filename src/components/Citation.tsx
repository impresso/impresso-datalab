import React, { useEffect, useState } from "react"
import * as Cite from "@citation-js/core"
import "@citation-js/plugin-csl"
import "@citation-js/plugin-bibtex"

export interface CitationProps {
  bibtex: string
  showCopyButton?: boolean
  format?: "html" | "bibtex"
  onCitationGenerated?: (citation: string) => void
}

const Citation: React.FC<CitationProps> = ({
  bibtex,
  showCopyButton = false,
  format = "html",
  onCitationGenerated,
}) => {
  const [citationHtml, setCitationHtml] = useState<string>("")
  const [copied, setCopied] = useState<boolean>(false)

  const generateCitation = async () => {
    if (!bibtex?.trim()) {
      setCitationHtml("")
      return
    }

    try {
      const cite = new Cite.Cite(bibtex)

      let result: string
      if (format === "html") {
        result = cite.format("bibliography", {
          format: "html",
          template: "chicago-fullnote-bibliography",
          lang: "en-GB",
        })
      } else if (format === "bibtex") {
        result = cite.format("bibtex")
      } else {
        result = "Unsupported citation format."
      }

      setCitationHtml(result)
      onCitationGenerated?.(result)
    } catch (error) {
      setCitationHtml("Invalid citation data.")
      console.warn("Error generating citation:", error)
    }
  }

  useEffect(() => {
    generateCitation()
  }, [bibtex, format])

  const copyToClipboard = async () => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(citationHtml, "text/html")
    const plainText = doc.body.textContent || ""

    try {
      await navigator.clipboard.writeText(plainText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.warn("Failed to copy to clipboard:", error)
    }
  }

  if (!citationHtml.length) return null

  return (
    <div className="Citation">
      <div
        className="flex-grow-1 mb-2"
        dangerouslySetInnerHTML={{ __html: citationHtml }}
      />
      {showCopyButton && (
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary"
          onClick={copyToClipboard}
          title={copied ? "Copied! ✓" : "Copy ..."}
        >
          {copied ? "Copied! ✓" : "Copy ..."}
        </button>
      )}
    </div>
  )
}

export default Citation
