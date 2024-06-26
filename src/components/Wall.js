import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { Col, Container, Row } from "react-bootstrap"
import TutorialCard from "./TutorialCard"
import CollectionCard from "./CollectionCard"
import ReactCodeMirror from "@uiw/react-codemirror"
import { nord } from "@uiw/codemirror-theme-nord"
import { python } from "@codemirror/lang-python"

const CodeSample = `
from impresso import api 

print(api.version())

results = api.search("moon landing")
`

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
    <main className="Wall mx-lg-5 mx-md-2">
      <Container fluid>
        <Row>
          <Col md={{ span: 6 }} xxl={{ span: 5 }} className="align-self-center">
            <h1 className="display-3 mb-4" style={{ width: "85%" }}>
              Give your media monitoring a boost
            </h1>

            <p style={{ width: "85%" }}>
              We collected <b>{notebooks.totalCount}</b>{" "}
              <em>Jupyter notebooks</em> so far; developed{" "}
              <b>{tutorials.totalCount}</b> tutorials; orchestrated{" "}
              <b>{collections.totalCount}</b> collections of notebooks,
              developed by <b>{authors.totalCount}</b> authors.
            </p>
            <section className="mt-5"></section>
          </Col>
          <Col md={{ span: 6 }} xxl={{ span: 5 }}>
            {highlighted.nodes.length ? (
              <CollectionCard name={highlighted.nodes[0].name}>
                <ReactCodeMirror
                  value={CodeSample}
                  theme={nord}
                  extensions={[python()]}
                />
              </CollectionCard>
            ) : (
              <p>No highlighted collections found.</p>
            )}
          </Col>
          <Col
            md={{ span: 12 }}
            xxl={{ span: 2 }}
            className="mt-md-5 mt-sm-4 mt-4 mt-xxl-0"
          >
            <h3 className="mb-xxl-4">Quick links</h3>
            <p>
              The `impresso-py` python package documentation is on{" "}
              <Link to="/docs">readthedocs</Link>. All the notebooks have each
              an independent environment you can spin with docker, preview on
              mybinder, google colab...
            </p>
          </Col>
        </Row>
        <Row className="my-3  align-items-bottom">
          <Col className=" d-flex  justify-content-center align-items-end ">
            <h3 className="border-bottom border-dark p-3 w-100">
              Notebooks you didn't think you needed
            </h3>
          </Col>
          <Col className="  d-flex justify-content-center align-items-end ">
            <h3 className="border-bottom border-dark p-3 w-100">
              Work with your data!
            </h3>
          </Col>
          <Col className="  d-flex justify-content-center align-items-end ">
            <h3 className="border-bottom border-dark p-3 w-100">Tutorials</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            {/* put collection ID manually using the collection ID path */}
            <CollectionCard name="drawing-maps-and-timelines"></CollectionCard>
          </Col>
          <Col>
            <CollectionCard name="notebooks-we-are-testing-right-now"></CollectionCard>
          </Col>
          <Col>
            {tutorials.nodes.map((node) => (
              <TutorialCard name={node.name} key={node.name} />
            ))}
          </Col>
        </Row>
      </Container>
    </main>
  )
}

export default Wall
