import "./ToolCard.css"
import { ArrowRight } from "iconoir-react"
import { DateTime } from "luxon"
import type { Tool } from "../types"
import { marked } from "marked"
import Link from "./Link"

const ToolTypeColors: Record<string, string[]> = {
  "huggingface-model": ["#FF6B35", "#F7931E", "#FDC830", "#FFB830", "#FF8C42"],
  "python-library": ["#3776AB", "#FFD43B", "#306998", "#FFE873", "#4B8BBE"],
}

const ToolCard: React.FC<{
  tool: Tool
  children?: React.ReactNode
  className?: string
}> = ({ tool, children, className = "" }) => {
  const accessTime = tool.date ?? new Date()
  const accessDateTime = DateTime.fromJSDate(accessTime)
  const avatarColors = ToolTypeColors[tool.type] || [
    "#6C63FF",
    "#4ECDC4",
    "#45B7D1",
    "#96CEB4",
    "#FFEAA7",
  ]

  console.debug(
    "[ToolCard] - accessDateTime:",
    accessDateTime.toISO(),
    "\n - title:",
    tool?.title,
    "\n - type:",
    tool.type,
  )

  const getToolUrl = () => {
    if (tool.type === "huggingface-model" && tool.huggingface?.modelUrl) {
      return tool.huggingface.modelUrl
    }
    if (tool.type === "python-library" && tool.python?.pypiUrl) {
      return tool.python.pypiUrl
    }
    return "#"
  }

  const toolUrl = getToolUrl()

  return (
    <div className={`ToolCard shadow-sm ${className}`}>
      <div className="px-3 py-2 d-flex align-items-center">
        <div>
          <Link to={tool.href}>
            <h3 className="mx-0 my-2">
              <span className="badge bg-secondary me-2 very-small-caps-medium">
                tool
              </span>
              <span
                dangerouslySetInnerHTML={{
                  __html: marked.parseInline(tool?.title ?? "", {}),
                }}
              ></span>
            </h3>
          </Link>
          {tool.summary && (
            <p className="small text-muted mb-2">{tool.summary}</p>
          )}
          {tool.tags && tool.tags.length > 0 && (
            <div className="small mb-2">
              {tool.tags.map((tag) => (
                <span
                  key={tag}
                  className="badge bg-secondary me-1"
                  style={{ fontSize: "0.75rem" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {children}
        </div>
        {toolUrl !== "#" && (
          <a
            href={toolUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ms-auto link-button"
          >
            <ArrowRight strokeWidth={2} />
          </a>
        )}
      </div>
    </div>
  )
}

export default ToolCard
