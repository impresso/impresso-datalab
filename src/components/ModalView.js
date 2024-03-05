import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useBrowserStore } from '../store'

const ModalView = ({ viewName = '', onClose, children, ...props }) => {
  const view = useBrowserStore((state) => state.view)
  return (
    <Modal show={view === viewName} onHide={onClose} {...props}>
      {children}
    </Modal>
  )
}

export default ModalView
