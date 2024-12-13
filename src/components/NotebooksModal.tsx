import Page from "./Page"
import NotebookCard from "./NotebookCard"
import { Col, Container, Row } from "react-bootstrap"
import type { Notebook } from "../types"

interface NotebookModalProps {
  notebooks: Notebook[]
}

const NotebooksModal: React.FC<NotebookModalProps> = ({ notebooks = [] }) => {
  return (
    <Page title="Browse our Notebooks" fullscreen="xl-down" size="xl">
      <Container>
        <Row>
          <Col md={4}>
            <h4 className="position-sticky top-0">Browse by categories</h4>
          </Col>
          <Col>
            {notebooks.map((notebook) => (
              <NotebookCard
                key={notebook.id}
                className="my-2"
                notebook={notebook}
              />
            ))}
          </Col>
        </Row>
      </Container>
    </Page>
  )
}

export default NotebooksModal
