import { Badge, Col, Container, Row } from "react-bootstrap"
import MarkdownSnippet from "./MarkdownSnippet"
import Page from "./Page"
import TableOfContents from "./TableOfContents"
import type { Tool, TOCEntry } from "../types"

interface ToolModalProps {
  tool: Tool
  content?: string
  toc?: TOCEntry[]
}

const ToolModal: React.FC<ToolModalProps> = ({
  tool,
  content = "",
  toc = [],
}) => {
  const tags = tool.tags || []
  const huggingface = tool.huggingface
  const python = tool.python
  const typeLabel =
    tool.type === "huggingface-model" ? "Hugging Face Model" : "Python Library"

  return (
    <Page title={tool.title} fullscreen="xl-down" size="lg">
      <Container className="ToolModal">
        <Row className="my-3">
          <h1>{tool.title}</h1>
        </Row>

        <Row className="my-3">
          <Col lg="7">
            <div className="mb-4">
              <div className="d-flex gap-2 mb-3 flex-wrap">
                <Badge bg="primary" pill className="py-2 px-3">
                  {typeLabel}
                </Badge>
                {tool.license && (
                  <Badge bg="secondary" pill className="py-2 px-3">
                    {tool.license}
                  </Badge>
                )}
              </div>

              {tool.summary && (
                <p className="text-muted fs-5 mb-4">{tool.summary}</p>
              )}

              {tags.length > 0 && (
                <div className="d-flex gap-2 flex-wrap mb-4">
                  {tags.map((tag) => (
                    <Badge key={tag} bg="light" text="dark">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="markdown-content">
                <MarkdownSnippet value={content} />
              </div>
            </div>
          </Col>

          <Col lg="5">
            <h4>Publications</h4>
            {tool.publications && tool.publications.length > 0 ? (
              <ul>
                {tool.publications.map((pub, index) => (
                  <li key={index}>{pub}</li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">No publications available.</p>
            )}
            <TableOfContents entries={toc} />
          </Col>
        </Row>
      </Container>
    </Page>
  )
}

export default ToolModal
