import { Col, Container, Row } from "react-bootstrap"
import CollectionCard, { type Collection } from "./CollectionCard"
import CodeSnippet from "./CodeSnippet"
import { useEffect } from "react"
import Link from "./Link"

const CodeSample = `
from impresso import api 

print(api.version())

results = api.search("moon landing")
`

const ImpressoModelsCodeSample = `
# Use a pipeline as a high-level helper
!pip install transformers

from transformers import pipeline
pipe = pipeline("text2text-generation", model="impresso-project/nel-mgenre-multilingual")
`

const Wall = ({
  // notebooks = [],
  numberOfAuthors = 10,
  numberOfNotebooks = 100,
  numberOfSeries = 2,
  // series = [],
  seriesUnexpected = [],
  seriesTutorials = [],
  seriesYourData = [],
  enterImpressoPy,
  enterImpressoModels,
  scrollToTop = false,
}: {
  numberOfAuthors?: number
  numberOfNotebooks?: number
  numberOfSeries?: number
  seriesUnexpected?: Collection[]
  seriesTutorials?: Collection[]
  seriesYourData?: Collection[]
  enterImpressoPy: Collection
  enterImpressoModels: Collection
  scrollToTop?: boolean
}) => {
  useEffect(() => {
    if (scrollToTop) {
      window.scrollTo(0, 0)
    }
  }, [scrollToTop])
  return (
    <div className="Wall mx-lg-5 mx-md-2" style={{ marginTop: 100 }}>
      <Container fluid>
        <Row>
          <Col md={{ span: 6 }} xxl={{ span: 4 }} className="align-self-center">
            <h1 className="display-3 mb-4" style={{ width: "85%" }}>
              Boost your Media Monitoring
            </h1>
            <h2>
              Explore and work programmatically with the Impresso Corpus, Data
              and Models
            </h2>
            <p style={{ width: "85%" }} className="d-none">
              We collected <b>{numberOfNotebooks}</b>{" "}
              <Link to="/notebooks" underline>
                Jupyter Ipynb notebooks
              </Link>{" "}
              in <b>{numberOfSeries}</b> series, maintained and developed by{" "}
              <b>{numberOfAuthors}</b> authors.
            </p>
            <section className="mt-5"></section>
          </Col>
          <Col md={{ span: 4 }} xxl={{ span: 3 }}>
            The Impresso project (link to project website) strives to create
            meaningful links across distinct datasets. The Impresso Datalab is
            an infrastructure for programmatic data access and annotation
            services. It offers access to our data and models via API and a
            dedicated Python library via Jupyter notebooks. The Datalab enables
            custom analyses of the Impresso corpus and the semantic indexation
            of external document collections with the help of models created by
            the project.
          </Col>
        </Row>
        <Row className="my-3  align-items-bottom d-none">
          <Col className="  d-flex justify-content-center align-items-end ">
            <h3 className=" p-3 w-100">Tutorials</h3>
          </Col>
          <Col className="  d-flex justify-content-center align-items-end ">
            <h3 className=" p-3 w-100">Work with your data!</h3>
          </Col>
          <Col className=" d-flex  justify-content-center align-items-end ">
            <h3 className=" p-3 w-100">
              Notebooks you didn't think you needed
            </h3>
          </Col>
        </Row>
        <Row className="my-3  align-items-bottom">
          <Col md={{ span: 4 }} xxl={{ span: 3 }}>
            <CollectionCard collection={enterImpressoPy}>
              <CodeSnippet value={CodeSample} theme={"duotoneDark"} />
            </CollectionCard>
            {seriesTutorials.map((collection) => (
              <CollectionCard key={collection.title} collection={collection} />
            ))}
          </Col>
          <Col>
            {seriesYourData.map((collection) => (
              <CollectionCard key={collection.title} collection={collection} />
            ))}
          </Col>
          <Col>
            <CollectionCard collection={enterImpressoModels}>
              <CodeSnippet
                value={ImpressoModelsCodeSample}
                theme={"duotoneDark"}
              />
            </CollectionCard>
            {seriesUnexpected.map((collection) => (
              <CollectionCard
                key={collection.title}
                collection={collection}
                className="mb-2"
              />
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Wall
