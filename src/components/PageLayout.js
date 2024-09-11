import { navigate } from "gatsby"
import React, { useEffect, useRef, useState } from "react"
import { Modal } from "react-bootstrap"
import { useBrowserStore } from "../store"

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
  const previousPathname = useBrowserStore((state) => state.previousPathname)
  const [show, setShow] = useState(true)
  const timerRef = useRef()

  const handleClose = () => {
    setShow(false)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      if (previousPathname) {
        navigate(-1)
      } else {
        navigate("/")
      }
    }, 800)
  }

  useEffect(() => {
    // scroll to 0 0
    if (path === "/") {
      setShow(false)
    } else {
      setShow(true)
    }
    return () => {
      clearTimeout(timerRef.current)
    }
  }, [path])

  return (
    <Modal
      size="lg"
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      scrollable
    >
      <Modal.Header closeButton>
        {/* <Link to="/">impresso-datalab</Link> */}
        test
      </Modal.Header>
      <Modal.Body className="container">{children}</Modal.Body>
    </Modal>
  )
}

export default PageLayout
