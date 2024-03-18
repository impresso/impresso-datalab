import { Link } from "gatsby"
import React, { useEffect, useRef, useState } from "react"
import { Button, Modal } from "react-bootstrap"

// const PageLayout = ({ children, path, pageContext }) => {
//   if (path == "/") {
//     return null
//   }
//   return (
//     <div
//       className="PageLayout position-fixed bg-white border rounded shadow-lg"
//       style={{
//         zIndex: 1000,
//         top: 50,
//         right: 50,
//         bottom: 50,
//         left: 50,
//         overflow: "scroll",
//       }}
//     >
//       <Link to="/">impresso-datalab</Link>
//       {children}
//     </div>
//   )
// }

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

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      // Back off, browser, I got this...
      window.history.scrollRestoration = "manual"
    }
  }, [])

  return (
    <Modal
      size="lg"
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      animation={false}
      fullscreen="true"
      scrollable
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
