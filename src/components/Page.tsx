import { Modal, type ModalProps } from "react-bootstrap"
import { useEffect, useRef, useState } from "react"

interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number
  title?: string
  fullscreen?: string | true | undefined
  subtitle?: string
  size?: ModalProps["size"]
  modalBodyClassName?: string
  modalFooterClassName?: string
  footer?: React.ReactNode
  autoOpenAfterDelay?: boolean
  manualOpen?: boolean
  onHide?: () => void
  onShow?: () => void
}

const Page: React.FC<PageProps> = ({
  delay = 100,
  title = "Untitled Page",
  subtitle = "",
  children,
  fullscreen = undefined,
  size,
  modalBodyClassName = "",
  modalFooterClassName = "",
  footer = null,
  autoOpenAfterDelay = true,
  // this is used only when autoOpenAfterDelay is false
  manualOpen = false,
  onHide,
  onShow,
}) => {
  const [show, setShow] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()
  const handleClose = () => {
    setShow(false)
    if (typeof onHide === "function") {
      onHide()
    }
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      console.info("[TokenModal] redirecting to impresso-datalab")
      // window.location.href = import.meta.env.PUBLIC_IMPRESSO_DATALAB_BASE
      // use push state
      window.history.pushState(
        {},
        "",
        import.meta.env.PUBLIC_IMPRESSO_DATALAB_BASE
      )
    }, 1000)
  }
  const handleShow = () => {
    if (typeof onShow === "function") {
      onShow()
    }
  }

  useEffect(() => {
    clearTimeout(timerRef.current)
    if (autoOpenAfterDelay) {
      timerRef.current = setTimeout(() => {
        setShow(true)
      }, delay)
    }
    return () => clearTimeout(timerRef.current)
  }, [autoOpenAfterDelay])

  useEffect(() => {
    if (!autoOpenAfterDelay) {
      setShow(manualOpen)
    }
  }, [autoOpenAfterDelay, manualOpen])

  return (
    <Modal
      fullscreen={fullscreen}
      show={show}
      onHide={handleClose}
      onShow={handleShow}
      backdrop="static"
      size={size}
      keyboard={false}
      scrollable
    >
      <Modal.Header closeButton>
        <Modal.Title className="small ps-2">
          {title}
          {subtitle.length > 0 && (
            <div className="small text-muted">{subtitle}</div>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={modalBodyClassName}>{children}</Modal.Body>
      {footer !== null ? (
        <Modal.Footer className={modalFooterClassName}>{footer}</Modal.Footer>
      ) : null}
    </Modal>
  )
}

export default Page
