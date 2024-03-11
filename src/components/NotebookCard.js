import React from "react"
import { ModalNotebookPreviewView, useDataStore } from "../store"
import AuthorCard from "./AuthorCard"
import { Button } from "react-bootstrap"
import "./NotebookCard.css"
import { navigate } from "gatsby"
import Avatar from "boring-avatars"
import { ArrowRight } from "iconoir-react"
import { DateTime } from "luxon"
import { Calendar } from "iconoir-react"

// const AvatarVariants = ["marble", "beam", "pixel", "sunset", "ring", "bauhaus"]
const NotebookCard = ({ name }) => {
  const getNotebookByName = useDataStore((state) => state.getNotebookByName)
  const notebook = getNotebookByName(name)
  const navigateToNotebookPage = () => {
    navigate(`?view=${ModalNotebookPreviewView}&viewId=${name}`)
  }

  const timeString = notebook?.accessTime

  const dateTime = DateTime.fromISO(timeString)

  const day = dateTime.day
  const month = dateTime.month
  const year = dateTime.year

  console.log("notebook", day, month)

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
            <Calendar height={"16px"} width={"16px"} />
            <span>{day + "/" + month + "/" + year}</span>
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
