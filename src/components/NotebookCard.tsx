import AuthorCard from "./AuthorCard.tsx"
import "./NotebookCard.css"
import Link from "./Link.tsx"
import Avatar from "boring-avatars"
import { ArrowRight } from "iconoir-react"
import { DateTime } from "luxon"
import type { Notebook } from "../types.ts"
import { NotebookLevelColors } from "../constants.ts"

// const AvatarVariants = ["marble", "beam", "pixel", "sunset", "ring", "bauhaus"]
const NotebookCard: React.FC<{
  notebook: Notebook
  children?: React.ReactNode
  className?: string
}> = ({ notebook, children, className = "" }) => {
  const accessTime = notebook.date ?? new Date()
  const accessDateTime = DateTime.fromJSDate(accessTime)
  console.debug(
    "[NotebookCard] - accessDateTime:",
    accessDateTime,
    "- title:",
    notebook?.title,
    "notebook.langModel",
    notebook.langModel,
    notebook
  )
  return (
    <div className={`NotebookCard shadow-sm ${className}`}>
      <div className="px-3 py-2 d-flex align-items-center">
        <div className="Avatar position-relative">
          <Avatar
            size={40}
            name={notebook.id}
            variant="marble"
            square={false}
            colors={NotebookLevelColors[notebook.levels.method].concat(
              NotebookLevelColors[notebook.levels.coding]
            )}
          />
        </div>
        <div className="mx-3">
          <a target="_blank" className="small" href={notebook?.langModel}>
            <img
              src="https://img.shields.io/badge/Open_in_Colab-fafafa?logo=googlecolab"
              alt="Open In Colab"
            />
          </a>
          <Link to={notebook.href}>
            <h3 className="mx-0 my-2">{notebook?.title}</h3>
          </Link>
          {/* <div className="small"> {accessDateTime.toFormat("yyyy LLL dd")}</div> */}
          <ol className="NotebookCard__authors small list-unstyled d-flex flex-wrap mb-2">
            <li>by&nbsp;</li>
            {notebook.authors.map((author, i) => (
              <li className="inline-block" key={author.name}>
                {" "}
                <AuthorCard author={author} />
                {i < notebook.authors.length - 1 && notebook.authors.length > 1
                  ? ","
                  : ""}
              </li>
            ))}
          </ol>
          {children}
        </div>
        <Link to={notebook.href} className="ms-auto link-button">
          <ArrowRight strokeWidth={2} />
        </Link>
      </div>
    </div>
  )
}
export default NotebookCard
