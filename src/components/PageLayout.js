import { useSpring } from "@react-spring/web"
import { Link } from "gatsby"
import React, { useEffect, useRef, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import ModalNotebookPreview from "./ModalNotebookPreview"

const PageLayout = ({ children, path, pageContext }) => {
  console.log("[PageLayout] render props")
  const [show, setShow] = useState(true)
  const timerRef = useRef()

  const handleClose = () => {
    setShow(false)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      window.history.back()
    }, 800)
  }
  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current)
    }
  }, [])
  useEffect(() => {
    // scroll to 0 0
    // window.scrollTo(0, 0)
    if (path === "/") {
      setShow(false)
    } else {
      setShow(true)
    }
  }, [path])

  return (
    <Modal
      size="lg"
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Link to="/">impresso-datalab</Link>
        <Button variant="primary" onClick={handleClose}>
          close
        </Button>
      </Modal.Header>
      <Modal.Body className="container">{children}</Modal.Body>
    </Modal>
  )
}

export default PageLayout
