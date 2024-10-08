import AuthorCard, { type Author } from "./AuthorCard.tsx"
import "./NotebookCard.css"
import Link from "./Link.tsx"
import Avatar from "boring-avatars"
import { ArrowRight } from "iconoir-react"
import { DateTime } from "luxon"

export interface Notebook {
  slug: string
  href: string
  title: string
  excerpt?: string
  githubUrl?: string
  googleColabUrl?: string
  sha?: string
  authors: Author[]
  date?: Date
  seealso?: Notebook[]
}

// const AvatarVariants = ["marble", "beam", "pixel", "sunset", "ring", "bauhaus"]
const NotebookCard: React.FC<{
  notebook: Notebook
  children?: React.ReactNode
  className?: string
}> = ({ notebook, children, className = "" }) => {
  const accessTime = notebook.date ?? new Date()
  const accessDateTime = DateTime.fromJSDate(accessTime)

  return (
    <Link to={notebook.href}>
      <div className={`NotebookCard shadow-sm ${className}`}>
        <div className="p-3 d-flex align-items-center">
          <div className="Avatar">
            <Avatar
              size={40}
              name={notebook.href}
              variant="marble"
              square={false}
            />
          </div>
          <div className="mx-3">
            <div className="date">
              <div className="badge bg-secondary me-2">Python notebook</div>{" "}
            </div>
            <h3 className="mx-0 my-2">{notebook?.title}</h3>
            <div className="small">
              {" "}
              {accessDateTime.toFormat("yyyy LLL dd")}
            </div>
            <ol className="NotebookCard__authors  list-unstyled d-flex flex-wrap gap-1">
              <li>by:</li>
              {notebook.authors.map((author) => (
                <li className="inline-block" key={author.name}>
                  <AuthorCard author={author} />
                </li>
              ))}
            </ol>
            {children}
          </div>
          <div className="ms-auto link-button">
            <ArrowRight strokeWidth={2} />
          </div>
        </div>
      </div>
    </Link>
  )
}
export default NotebookCard
