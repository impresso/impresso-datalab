import AuthorCard, { type Author } from "./AuthorCard.tsx"
import "./NotebookCard.css"
import Link from "./Link.tsx"
import Avatar from "boring-avatars"
import { ArrowRight } from "iconoir-react"
import { DateTime } from "luxon"

export interface Notebook {
  name: string
  title: string
  authors: Author[]
  accessTime: string
}

// const AvatarVariants = ["marble", "beam", "pixel", "sunset", "ring", "bauhaus"]
const NotebookCard: React.FC<{ notebook: Notebook }> = ({ notebook }) => {
  const accessTime = notebook.accessTime
  const accessDateTime = DateTime.fromISO(accessTime)

  return (
    <Link to={`/notebook/${notebook.name}`}>
      <div className="NotebookCard shadow-sm">
        <div className="p-3 d-flex align-items-center">
          <div className="Avatar">
            <Avatar
              size={40}
              name={notebook.name}
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
                <AuthorCard key={author.slug} author={author} />
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