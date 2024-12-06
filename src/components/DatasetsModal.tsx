import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Page from "./Page"
import { Col, Container, Row } from "react-bootstrap"

export type DatasetModalProps = {
  title?: string
  modalTitle?: string
  content: string
  displayFeatures?: boolean
}

const DatasetModal: React.FC<DatasetModalProps> = ({
  modalTitle = "Datasets",
  // content,
  // displayFeatures = true,
  // title,
}) => {
  const { status, data } = useQuery({
    queryKey: ["datasets"],
    queryFn: async () => {
      const response = await axios.get(
        "https://raw.githubusercontent.com/impresso/impresso-corpus-metadata/refs/heads/master/data/access_rights_masterfiles/corpus_access_catalogue.json"
      )
      return response.data
    },
  })

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
        <Row>jejejejeej</Row>
      </Container>
    </Page>
  )
}

export default DatasetModal
