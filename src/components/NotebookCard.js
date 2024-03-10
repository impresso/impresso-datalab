import React from "react"
import { ModalNotebookPreviewView, useDataStore } from "../store"
import AuthorCard from "./AuthorCard"
import { Button } from "react-bootstrap"
import "./NotebookCard.css"
import { navigate } from "gatsby"
import Avatar from "boring-avatars"
import { ArrowRight } from "iconoir-react"

// const AvatarVariants = ["marble", "beam", "pixel", "sunset", "ring", "bauhaus"]
const NotebookCard = ({ name }) => {
  const getNotebookByName = useDataStore((state) => state.getNotebookByName)
  const notebook = getNotebookByName(name)
  const navigateToNotebookPage = () => {
    navigate(`?view=${ModalNotebookPreviewView}&viewId=${name}`)
  }

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
          <Button
            variant="secondary"
            className="p-0"
            style={{ width: 36, height: 36 }}
            onClick={navigateToNotebookPage}
          >
            <ArrowRight strokeWidth={2} />
          </Button>
        </div>
      </div>
    </div>
  )
}
export default NotebookCard
