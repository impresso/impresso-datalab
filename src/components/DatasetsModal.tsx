import type { Dataset } from "./DatasetCard"
import Page from "./Page"
import { Col, Container, Row } from "react-bootstrap"

export type DatasetModalProps = {
  title?: string
  modalTitle?: string
  content: string
  displayFeatures?: boolean
  datasets: Dataset[]
}

const DatasetModal: React.FC<DatasetModalProps> = ({
  modalTitle = "Datasets",
  // content,
  // displayFeatures = true,
  // title,
  datasets = [],
}) => {
  return (
    <Page
      title={modalTitle}
      fullscreen="xl-down"
      size="xxl"
      modalBodyClassName="pt-0 pe-4 ps-2 PlansModal mx-1"
    >
      <Container>
        <Row className="my-3">
          <Col sm={12}>
            <h1>{status}</h1>
          </Col>
        </Row>
        <Row>
          jejejejeej
          <pre>{JSON.stringify(datasets, null, 2)}</pre>
        </Row>
      </Container>
    </Page>
  )
}

export default DatasetModal
