import Page from "./Page"
import type { Notebook } from "./NotebookCard"
import NotebookCard from "./NotebookCard"
import { Col, Container, Row } from "react-bootstrap"

interface NotebookModalProps {
  notebooks: Notebook[]
}

const NotebooksModal: React.FC<NotebookModalProps> = ({ notebooks = [] }) => {
  return (
    <Page title="All Notebook" fullscreen="xl-down" size="xl">
      <Container>
        <Row>
          {notebooks.map((notebook) => (
            <Col md={4} className="mb-3" key={notebook.slug}>
              <NotebookCard notebook={notebook} />
            </Col>
          ))}
        </Row>
      </Container>
    </Page>
  )
}

export default NotebooksModal
