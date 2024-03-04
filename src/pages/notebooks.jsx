import React from 'react'
import { graphql } from 'gatsby'

const Notebooks = ({ data }) => {
  return <div>{data.allMdx.totalCount}</div>
}

export const query = graphql`
  query MyQuery {
    allMdx {
      totalCount
    }
  }
`

export default Notebooks
