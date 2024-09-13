import { Modal } from "react-bootstrap"
import TokenWrapper from "./TokenWrapper"
import { useEffect, useRef, useState } from "react"

const TokenModal: React.FC<{ delay: number }> = ({ delay = 1000 }) => {
  const [show, setShow] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()
  const handleClose = () => {
    setShow(false)

    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      console.info("[TokenModal] redirecting to impresso-datalab")
      window.location.href = import.meta.env.PUBLIC_IMPRESSO_DATALAB_BASE
    }, 1000)
  }

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setShow(true)
    }, delay)
    return () => clearTimeout(timerRef.current)
  }, [])

  return (
    <Modal
      centered
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Your API token</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Here is your API token. Please keep it safe and do not share it with
          anyone.
        </p>
        <TokenWrapper />
      </Modal.Body>
    </Modal>
  )
}

export default TokenModal
