import { Modal } from "react-bootstrap"
import { useEffect, useRef, useState } from "react"

interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number
  title?: string
}

const Page: React.FC<PageProps> = ({
  delay = 100,
  title = "Untitled Page",
  children,
}) => {
  const [show, setShow] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()
  const handleClose = () => {
    setShow(false)

    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      console.info("[TokenModal] redirecting to impresso-datalab")
      // window.location.href = import.meta.env.PUBLIC_IMPRESSO_DATALAB_BASE
      // use push state
      window.history.pushState(
        {},
        "",
        import.meta.env.PUBLIC_IMPRESSO_DATALAB_BASE,
      )
    }, 1000)
  }

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setShow(true)
    }, delay)
    return () => clearTimeout(timerRef.current)
  }, [])

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  )
}

export default Page
