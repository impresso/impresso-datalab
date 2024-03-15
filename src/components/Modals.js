import React from "react"
import { AvailableModalsViews, useBrowserStore } from "../store"
import { Button } from "react-bootstrap"
import ModalLogin from "./ModalLogin"
import ModalNotebookPreview from "./ModalNotebookPreview"
import ModalTutorial from "./ModalTutorial"

const Modals = ({ debug = false }) => {
  const setView = useBrowserStore((state) => state.setView)
  const onCloseHandler = () => {
    setView(null)
  }

  return (
    <>
      {debug &&
        AvailableModalsViews.map((modal) => (
          <Button className="mx-1" key={modal} onClick={() => setView(modal)}>
            {modal}
          </Button>
        ))}
      <ModalNotebookPreview onClose={onCloseHandler} centered />
      <ModalTutorial onClose={onCloseHandler} />
      <ModalLogin onClose={onCloseHandler} centered />
    </>
  )
}

export default Modals
