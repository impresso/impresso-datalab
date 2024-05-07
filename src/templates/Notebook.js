import React, { useRef } from "react"
import { Col, Container, Row } from "react-bootstrap"
import Markdown from "../components/Markdown"
import CodeSnippet from "../components/CodeSnippet"

const Notebook = ({ path, pageContext, ...props }) => {
  const codeMirrorRef = useRef(null)

  return (
    <div className="Notebook">
      <Container>
        <h1>{pageContext.data.title}</h1>
        <Row>
          <Col lg="8">
            <Markdown>{pageContext.data.body}</Markdown>
            {JSON.stringify(path)}

            <CodeSnippet
              value={JSON.stringify(props, null, 2)}
              codeMirrorRef={codeMirrorRef}
            />
          </Col>
          <Col lg="4">
            {pageContext.data.excerpt}
            <ul>
              {pageContext.data.tableOfContents.items?.map((d, i) => (
                <li key={i}>{d.title}</li>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Notebook
