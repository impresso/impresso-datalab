import React from 'react'
import { graphql } from 'gatsby'

const Index = ({ data }) => {
  return (
    <div
      className='d-flex align-items-center justify-content-center'
      style={{ height: 400 }}
    >
      <h1>Datalab</h1>
      <br></br>
      {data.allMdx.totalCount}
    </div>
  )
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

export default Index
