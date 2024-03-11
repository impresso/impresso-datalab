import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Col, Container, Row } from "react-bootstrap"
import TutorialCard from "./TutorialCard"
import CollectionCard from "./CollectionCard"

const Wall = () => {
  const { highlighted, collections, notebooks, authors, tutorials } =
    useStaticQuery(graphql`
      query {
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
                notebooks
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
          }
        }
        notebooks: allFile(
          filter: { sourceInstanceName: { eq: "notebooks" } }
        ) {
          totalCount
        }
        authors: allFile(filter: { sourceInstanceName: { eq: "authors" } }) {
          totalCount
        }
        tutorials: allFile(
          filter: { sourceInstanceName: { eq: "tutorials" } }
          limit: 1
        ) {
          totalCount
          nodes {
            name
            childMdx {
              excerpt
              frontmatter {
                title
              }
            }
          }
        }
      }
    `)

  return (
    <Container fluid className="Index">
      <Row>
        <Col>
          <h2>Highlights</h2>
          {highlighted.nodes.length ? (
            highlighted.nodes.map((node) => (
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
              We collected <b>{notebooks.totalCount}</b> Jupyter notebooks so
              far; developed <b>{tutorials.totalCount}</b> tutorials;
              orchestrated <b>{collections.totalCount}</b> collections of
              notebooks, developed by <b>{authors.totalCount}</b> authors.
            </p>
            <CollectionCard name="notebooks-we-are-testing-right-now" />
          </section>
        </Col>
      </Row>
      <Row className="mb-3 py-3 align-items-bottom">
        <Col className=" d-flex  justify-content-center align-items-end ">
          <h2 className="border-bottom border-dark w-100">
            Notebooks you didn't think you needed
          </h2>
        </Col>
        <Col className="  d-flex justify-content-center align-items-end ">
          <h2 className="border-bottom border-dark w-100">Tutorials</h2>
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <Col></Col>
        <Col>
          {tutorials.nodes.map((node) => (
            <TutorialCard name={node.name} key={node.name} />
          ))}
        </Col>
        <Col></Col>
      </Row>
    </Container>
  )
}

export default Wall
