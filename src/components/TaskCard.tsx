import "./TaskCard.css"
import { ArrowRight } from "iconoir-react"
import type { Task } from "../types"
import { marked } from "marked"
import Link from "./Link"

const TaskCard: React.FC<{
  task: Task
  children?: React.ReactNode
  className?: string
}> = ({ task, children, className = "" }) => {
  return (
    <div className={`TaskCard shadow-sm ${className}`}>
      <div className="px-3 py-2 d-flex align-items-center">
        <div>
          <Link to={task.href}>
            <h3 className="mx-0 my-2">
              <span className="badge bg-secondary me-2 very-small-caps-medium">
                task
              </span>
              <span
                dangerouslySetInnerHTML={{
                  __html: marked.parseInline(task?.title ?? "", {}),
                }}
              ></span>
            </h3>
          </Link>

          {children}
        </div>

        <Link
          to={task.href}
          target="_blank"
          className="ms-auto link-button"
        >
          <ArrowRight strokeWidth={2} />
        </Link>
      </div>
    </div>
  )
}

export default TaskCard
