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
const NotebookCard: React.FC<{ notebook: Notebook }> = ({ notebook }) => {
  const accessTime = notebook.date ?? new Date()
  const accessDateTime = DateTime.fromJSDate(accessTime)

  return (
    <Link to={notebook.href}>
      <div className="NotebookCard shadow-sm">
        <div className="p-3 d-flex align-items-center">
          <div className="Avatar">
            <Avatar
              size={40}
              name={notebook.slug}
              variant="marble"
              square={false}
            />
          </div>
          <div className="mx-3">
            <div className="date">
              <span>{accessDateTime.toFormat("yyyy LLL dd")}</span>
            </div>
            <h3 className="m-0">{notebook?.title}</h3>
            <ol className="NotebookCard__authors">
              {notebook.authors.map((author) => (
                <AuthorCard key={author.name} author={author} />
              ))}
            </ol>
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
