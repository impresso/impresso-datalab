import React from 'react'
import { AvailableModalsViews } from '../store'
import { Button } from 'react-bootstrap'
import { navigate } from 'gatsby'
import ModalLogin from './ModalLogin'
import ModalNotebookPreview from './ModalNotebookPreview'

const Modals = ({ debug = false }) => {
  const onCloseHandler = () => {
    navigate('')
  }

  return (
    <>
      {debug &&
        AvailableModalsViews.map((modal) => (
          <Button
            className='mx-1'
            key={modal}
            onClick={() => navigate(`?view=${modal}`)}
          >
            {modal}
          </Button>
        ))}
      <ModalNotebookPreview onClose={onCloseHandler} centered />
      <ModalLogin onClose={onCloseHandler} centered />
    </>
  )
}

export default Modals
