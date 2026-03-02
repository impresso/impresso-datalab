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
  return (
    <Page title="Tasks" fullscreen="xl-down" size="lg">
      <Container className="ToolModal">
        <Row className="my-3">
          <h1>{tool.title}</h1>
        </Row>

        <Row className="my-3">
          <Col lg="7">
            <div className="mb-4">
              <div className="d-flex gap-2 mb-3 flex-wrap">
                {tool.tags?.map((tag) => (
                  <Badge
                    key={tag}
                    bg="primary"
                    pill
                    className="py-2 px-3 text-dark"
                  >
                    {tag}
                  </Badge>
                ))}

                {tool.license && (
                  <Badge bg="secondary" pill className="py-2 px-3">
                    {tool.license}
                  </Badge>
                )}
              </div>

              {tool.summary && (
                <p className="text-muted fs-5 mb-4">{tool.summary}</p>
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
                {tool.publications.map((pub: any, index: number) => (
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
