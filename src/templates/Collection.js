import React from 'react'

const Collection = (...props) => {
  return (
    <div className='Collection'>
      <h1>Collection</h1>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  )
}
export default Collection
