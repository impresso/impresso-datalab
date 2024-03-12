import React from "react"
import { ModalNotebookPreviewView, useDataStore } from "../store"
import AuthorCard from "./AuthorCard"
import { Button } from "react-bootstrap"
import "./NotebookCard.css"
import { Link, navigate } from "gatsby"
import Avatar from "boring-avatars"
import { ArrowRight } from "iconoir-react"
import { DateTime } from "luxon"

// const AvatarVariants = ["marble", "beam", "pixel", "sunset", "ring", "bauhaus"]
const NotebookCard = ({ name }) => {
  const getNotebookByName = useDataStore((state) => state.getNotebookByName)
  const notebook = getNotebookByName(name)
  const navigateToNotebookPage = () => {
    navigate(`?view=${ModalNotebookPreviewView}&viewId=${name}`)
  }
  const accessTime = notebook?.accessTime
  const accessDateTime = DateTime.fromISO(accessTime)

  return (
    <div className="NotebookCard shadow-sm">
      <div className="p-3 d-flex align-items-center">
        <div>
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
          <h3 className="m-0" onClick={navigateToNotebookPage}>
            {notebook?.title}
          </h3>
          <ol className="NotebookCard__authors">
            {notebook?.authors.map((name) => (
              <li key={name}>
                <AuthorCard name={name} />
              </li>
            ))}
          </ol>
        </div>
        <div className="ms-auto">
          <Link
            to={`/notebook/${notebook?.name}`}
            style={{ width: 36, height: 36 }}
          >
            <ArrowRight strokeWidth={2} />
          </Link>
        </div>
      </div>
    </div>
  )
}
export default NotebookCard
