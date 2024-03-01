import React from 'react'

const Notebook = ({ path, ...props }) => {
  return (
    <div className='Notebook'>
      {JSON.stringify(path)}
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  )
}

export default Notebook
