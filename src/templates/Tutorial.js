import React from "react"
import { Col, Container, Row } from "react-bootstrap"
import Markdown from "../components/Markdown"

const Tutorial = ({ path, pageContext, ...props }) => {
  return (
    <div className="Tutorial">
      <Container>
        <h1>{pageContext.data.title}</h1>
        <Row>
          <Col>
            <Markdown>{pageContext.data.body}</Markdown>
          </Col>
          <Col>
            {pageContext.data.excerpt}
            <ul>
              {pageContext.data.tableOfContents.items?.map((d, i) => (
                <li key={i}>{d.title}</li>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
      {JSON.stringify(path)}
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  )
}

export default Tutorial
