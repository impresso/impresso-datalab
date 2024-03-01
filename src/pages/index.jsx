import React from 'react'
import { Link, graphql } from 'gatsby'

const Index = ({ data }) => {
  return (
    <div className='Index'>
      <div
        className='d-flex align-items-center justify-content-center'
        style={{ height: 400 }}
      >
        <h1>Datalab</h1>
      </div>
      <ul>
        {data.notebooks.totalCount}
        {data.notebooks.nodes.map((node, i) => (
          <li key={i}>
            <Link to={'/notebook/' + node.name}>
              - {node.childMdx.frontmatter.title}
            </Link>
          </li>
        ))}
      </ul>
      <ul>
        {data.collections.totalCount}
        {data.collections.nodes.map((node, i) => (
          <li key={i}>{node.childMdx.frontmatter.title}</li>
        ))}
      </ul>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export const query = graphql`
  query Content {
    notebooks: allFile(filter: { sourceInstanceName: { eq: "notebooks" } }) {
      totalCount
      nodes {
        name
        childMdx {
          id
          excerpt
          frontmatter {
            title
          }
        }
      }
    }
    collections: allFile(
      filter: { sourceInstanceName: { eq: "collections" } }
    ) {
      totalCount
      nodes {
        name
        childMdx {
          id
          excerpt
          frontmatter {
            title
          }
        }
      }
    }
  }
`

export default Index
