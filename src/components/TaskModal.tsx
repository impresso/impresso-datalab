import { Badge, Col, Container, Row } from "react-bootstrap"
import MarkdownSnippet from "./MarkdownSnippet"
import Page from "./Page"
import TableOfContents from "./TableOfContents"
import type { Task, TOCEntry } from "../types"
import "./TaskModal.css"
import NotebookCard from "./NotebookCard"
import Citation from "./Citation"

interface TaskModalProps {
  task: Task
  content?: string
  toc?: TOCEntry[]
}

const TaskModal: React.FC<TaskModalProps> = ({
  task,
  content = "",
  toc = [],
}) => {
  const tags = task.tags || []
  return (
    <Page title="Tasks" fullscreen="xl-down" size="lg">
      <Container className="TaskModal">
        <Row className="my-3">
          <h1>{task.title}</h1>
        </Row>

        <Row className="my-3">
          <Col lg="7">
            <div className="mb-4">
              <div className="d-flex gap-2 mb-3 flex-wrap">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    bg="primary"
                    pill
                    className="py-2 px-3 text-dark"
                  >
                    {tag}
                  </Badge>
                ))}

                {task.license && (
                  <Badge bg="secondary" pill className="py-2 px-3">
                    {task.license}
                  </Badge>
                )}
              </div>

              {task.summary && (
                <p className="text-muted fs-5 mb-4">{task.summary}</p>
              )}

              <div className="markdown-content">
                <MarkdownSnippet value={content} />
              </div>
              <h2 className="mt-4">Notebooks</h2>
              {task.notebooks && task.notebooks.length > 0 ? (
                <ul className="list-unstyled">
                  {task.notebooks
                    .filter((notebook) => !notebook.draft)
                    .map((notebook) => (
                      <li key={notebook.href} className="mt-2">
                        <NotebookCard notebook={notebook} />
                      </li>
                    ))}
                </ul>
              ) : (
                <p className="text-muted">No notebooks available.</p>
              )}
            </div>
          </Col>

          <Col lg="5">
            <h4>Publications</h4>
            {task.publications && task.publications.length > 0 ? (
              <ul className="list-unstyled">
                {task.publications.map((pub: any, index: number) => (
                  <li key={index} className="mb-3">
                    <Citation bibtex={pub} format="html" showCopyButton />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">No publications available.</p>
            )}

            <TableOfContents footerClass="pb-4" entries={toc} />
          </Col>
        </Row>
      </Container>
    </Page>
  )
}

export default TaskModal
