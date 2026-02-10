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
            {tool.type === "huggingface-model" && (
              <div className="mb-4">
                <h4>Hugging Face</h4>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {huggingface?.modelId && (
                    <li className="mb-2">
                      <strong>Model:</strong> {huggingface.modelId}
                    </li>
                  )}
                  {huggingface?.modelUrl && (
                    <li className="mb-2">
                      <a
                        href={huggingface.modelUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Model page
                      </a>
                    </li>
                  )}
                  {huggingface?.pipelineTag && (
                    <li className="mb-2">
                      <strong>Pipeline:</strong> {huggingface.pipelineTag}
                    </li>
                  )}
                  {huggingface?.provider && (
                    <li className="mb-2">
                      <strong>Provider:</strong> {huggingface.provider}
                    </li>
                  )}
                </ul>
              </div>
            )}

            {tool.type === "python-library" && (
              <div className="mb-4">
                <h4>Python Library</h4>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {python?.package && (
                    <li className="mb-2">
                      <strong>Package:</strong> {python.package}
                    </li>
                  )}
                  {python?.pypiUrl && (
                    <li className="mb-2">
                      <a
                        href={python.pypiUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        PyPI
                      </a>
                    </li>
                  )}
                  {python?.docsUrl && (
                    <li className="mb-2">
                      <a
                        href={python.docsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Documentation
                      </a>
                    </li>
                  )}
                  {python?.repoUrl && (
                    <li className="mb-2">
                      <a
                        href={python.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Repository
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            )}

            <TableOfContents entries={toc} />
          </Col>
        </Row>
      </Container>

      <style>{`
        .markdown-content {
          line-height: 1.8;
        }
        .markdown-content h2 {
          margin-top: 2rem;
          margin-bottom: 1rem;
          font-size: 1.5rem;
        }
        .markdown-content h3 {
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          font-size: 1.25rem;
        }
        .markdown-content p {
          margin-bottom: 1rem;
        }
        .markdown-content ul {
          margin-bottom: 1rem;
          padding-left: 2rem;
        }
      `}</style>
    </Page>
  )
}

export default ToolModal
