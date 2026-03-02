import "./ToolCard.css"
import { ArrowRight } from "iconoir-react"
import { DateTime } from "luxon"
import type { Tool } from "../types"
import { marked } from "marked"
import Link from "./Link"

const ToolCard: React.FC<{
  tool: Tool
  children?: React.ReactNode
  className?: string
}> = ({ tool, children, className = "" }) => {
  return (
    <div className={`ToolCard shadow-sm ${className}`}>
      <div className="px-3 py-2 d-flex align-items-center">
        <div>
          <Link to={tool.href}>
            <h3 className="mx-0 my-2">
              <span className="badge bg-secondary me-2 very-small-caps-medium">
                task
              </span>
              <span
                dangerouslySetInnerHTML={{
                  __html: marked.parseInline(tool?.title ?? "", {}),
                }}
              ></span>
            </h3>
          </Link>

          {children}
        </div>

        <a
          href={tool.href}
          target="_blank"
          rel="noopener noreferrer"
          className="ms-auto link-button"
        >
          <ArrowRight strokeWidth={2} />
        </a>
      </div>
    </div>
  )
}

export default ToolCard
