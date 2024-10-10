import Page from "./Page"
import { Container, Row } from "react-bootstrap"

const TermsOfUseModal: React.FC = () => {
  return (
    <Page
      title="Terms Of Use - Impresso Datalab"
      fullscreen="xl-down"
      size="xl"
    >
      <Container>
        <Row>
          <h1>Terms of Use</h1>
        </Row>
      </Container>
    </Page>
  )
}

export default TermsOfUseModal
