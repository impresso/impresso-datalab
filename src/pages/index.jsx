import React from 'react'
import { Link, graphql } from 'gatsby'
import { Col, Container, Row } from 'react-bootstrap'
import CollectionCard from '../components/CollectionCard'

const Index = ({ data }) => {
  const highlighted = data.highlighted.nodes
  return (
    <Container fluid className='Index'>
      <Row>
        <Col className='border-end border-dark'>
          <h2>Highlights</h2>
          {highlighted.length ? (
            highlighted.map((node, i) => (
              <CollectionCard
                frontmatter={node.childMdx.frontmatter}
                name={node.name}
                excerpt={node.childMdx.excerpt}
                key={i}
              />
            ))
          ) : (
            <p>No highlighted collections found.</p>
          )}

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
        </Col>
        <Col>
          <h1 className='display-3 '>Give your media monitoring a boost.</h1>
          <section className='mt-5'>
            <h2>Notebooks that we're testing right now</h2>

            <ul>
              {data.collections.totalCount}
              {data.collections.nodes.map((node, i) => (
                <li key={i}>{node.childMdx.frontmatter.title}</li>
              ))}
            </ul>
          </section>
        </Col>
      </Row>
      <hr />
      <Row>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Row>
    </Container>
  )
}

export const query = graphql`
  query Content {
    highlighted: allFile(
      filter: {
        sourceInstanceName: { eq: "collections" }
        childMdx: { frontmatter: { tags: { in: "highlight" } } }
      }
      limit: 1
    ) {
      totalCount
      nodes {
        name
        childMdx {
          excerpt
          frontmatter {
            title
            collection
            binderUrl
          }
        }
      }
    }
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
