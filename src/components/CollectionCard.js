import React from 'react'
import './CollectionCard.css'
import { graphql, useStaticQuery } from 'gatsby'

const CollectionCard = ({
  frontmatter = {},
  name = '',
  notebooks = [],
  excerpt = '',
}) => {
  return (
    <div className='CollectionCard border border-dark d-inline-block'>
      <div className='p-3'>
        <h3>{frontmatter.title}</h3>
        <p>{excerpt}</p>
      </div>
      <pre>{JSON.stringify(notebooks, null, 2)}</pre>
    </div>
  )
}

export default CollectionCard
