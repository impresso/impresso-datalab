import React from 'react'
import ModalView from './ModalView'
import { ModalNotebookPreviewView } from '../store'
import { Form, Modal } from 'react-bootstrap'

const ModalNotebookPreview = ({ onClose, ...props }) => {
  return (
    <ModalView viewName={ModalNotebookPreviewView} onClose={onClose} {...props}>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Using Grid in Modal
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>This is a nice title indeed!</Modal.Body>
    </ModalView>
  )
}
export default ModalNotebookPreview
