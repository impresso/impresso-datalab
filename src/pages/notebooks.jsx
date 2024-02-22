import React from 'react'
import { graphql } from 'gatsby'

const Notebooks = ({ data }) => {
  return <div>{data.allMdx.totalCount}</div>
}

export const query = graphql`
  query MyQuery {
    allMdx(filter: { frontmatter: { collection: { eq: "Enter impresso" } } }) {
      totalCount
      edges {
        node {
          id
        }
      }
    }
  }
`

export default Notebooks
