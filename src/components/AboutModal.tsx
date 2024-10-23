import { Col, Container, Row } from "react-bootstrap"
import MarkdownSnippet from "./MarkdownSnippet"
import Page from "./Page"
import DatalabDiagram from "./DatalabDiagram"

const AboutModal: React.FC<{ content: string }> = ({
  content,
}: {
  content: string
}) => {
  return (
    <Page title="About - Impresso Datalab" fullscreen="xl-down" size="xl">
      <Container>
        <Row>
          <h1 className="my-3">About</h1>
          <DatalabDiagram />
          <Col className="mt-3">
            <MarkdownSnippet value={content} />
          </Col>
        </Row>
      </Container>
    </Page>
  )
}

export default AboutModal
