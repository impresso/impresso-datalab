import React from "react"
import { graphql } from "gatsby"
import { Col, Container, Row } from "react-bootstrap"
import CollectionCard from "../components/CollectionCard"
import { useDataStore } from "../store"
import TutorialCard from "../components/TutorialCard"

const Index = ({ data }) => {
  const highlighted = data.highlighted.nodes
  const isReady = useDataStore((state) => state.isReady)

  return (
    <Container fluid className="Index">
      <Row>
        <Col>
          <h2>Highlights</h2>
          {highlighted.length && isReady ? (
            highlighted.map((node) => (
              <CollectionCard name={node.name} key={node.name} />
            ))
          ) : (
            <p>No highlighted collections found.</p>
          )}
        </Col>
        <Col>
          <h1 className="display-3 ">Give your media monitoring a boost.</h1>
          <section className="mt-5">
            <p>
              We collected <b>{data.notebooks.totalCount}</b> notebooks so far,
              in <b>{data.collections.totalCount}</b> collections developed by{" "}
              <b>{data.highlighted.totalCount}</b> authors.
            </p>
            <CollectionCard name="notebooks-we-are-testing-right-now" />
          </section>
        </Col>
      </Row>
      <Row className="mt-3 pt-3 border-top ">
        <Col>
          <h2>Notebooks you didn't know you needed</h2>
        </Col>
        <Col>
          <h2>Tutorials</h2>
          {data.tutorials.nodes.map((node) => (
            <TutorialCard name={node.name} key={node.name} />
          ))}
        </Col>
        <Col></Col>
      </Row>
    </Container>
  )
}

export const query = graphql`
  query Content {
    tutorials: allFile(filter: { sourceInstanceName: { eq: "tutorials" } }) {
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
