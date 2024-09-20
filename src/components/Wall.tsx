import { Col, Container, Row } from "react-bootstrap"
import CollectionCard, { type Collection } from "./CollectionCard"
import CodeSnippet from "./CodeSnippet"
import { useEffect } from "react"

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
  numberofCollections = 2,
  // series = [],
  seriesUnexpected = [],
  seriesTutorials = [],
  seriesYourData = [],
  enterImpressoPy,
  enterImpressoModels,
}: {
  numberOfAuthors?: number
  numberOfNotebooks?: number
  numberofCollections?: number
  seriesUnexpected?: Collection[]
  seriesTutorials?: Collection[]
  seriesYourData?: Collection[]
  enterImpressoPy: Collection
  enterImpressoModels: Collection
}) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className="Wall mx-lg-5 mx-md-2" style={{ marginTop: 100 }}>
      <Container fluid>
        <Row>
          <Col md={{ span: 6 }} xxl={{ span: 4 }} className="align-self-center">
            <h1 className="display-3 mb-4" style={{ width: "85%" }}>
              Give your media monitoring a boost
            </h1>

            <p style={{ width: "85%" }}>
              We collected <b>{numberOfNotebooks}</b> <em>Jupyter notebooks</em>{" "}
              so far; orchestrated <b>{numberofCollections}</b> collections of
              notebooks, developed by <b>{numberOfAuthors}</b> authors.
            </p>
            <section className="mt-5"></section>
          </Col>
          <Col md={{ span: 6 }} xxl={{ span: 3 }}>
            <CollectionCard collection={enterImpressoPy}>
              <CodeSnippet value={CodeSample} theme={"nord"} />
            </CollectionCard>
          </Col>
          <Col md={{ span: 6 }} xxl={{ span: 3 }}>
            <CollectionCard collection={enterImpressoModels}>
              <CodeSnippet
                value={ImpressoModelsCodeSample}
                theme={"duotoneDark"}
              />
            </CollectionCard>
          </Col>
          <Col
            md={{ span: 12 }}
            xxl={{ span: 2 }}
            className="mt-md-5 mt-sm-4 mt-4 mt-xxl-0"
          >
            <h3 className="mb-xxl-4">Quick links</h3>
            <p>
              The `impresso-py` python package documentation is on{" "}
              <a href="/docs">readthedocs</a>. All the notebooks have each an
              independent environment you can spin with docker, preview on
              mybinder, google colab...
            </p>
          </Col>
        </Row>
        <Row className="my-3  align-items-bottom">
          <Col className=" d-flex  justify-content-center align-items-end ">
            <h3 className=" p-3 w-100">
              Notebooks you didn't think you needed
            </h3>
          </Col>
          <Col className="  d-flex justify-content-center align-items-end ">
            <h3 className=" p-3 w-100">Work with your data!</h3>
          </Col>
          <Col className="  d-flex justify-content-center align-items-end ">
            <h3 className=" p-3 w-100">Tutorials</h3>
          </Col>
        </Row>
        <Row className="my-3  align-items-bottom">
          <Col>
            {seriesUnexpected.map((collection) => (
              <CollectionCard key={collection.title} collection={collection} />
            ))}
          </Col>
          <Col>
            {seriesYourData.map((collection) => (
              <CollectionCard key={collection.title} collection={collection} />
            ))}
          </Col>
          <Col>
            {seriesTutorials.map((collection) => (
              <CollectionCard key={collection.title} collection={collection} />
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Wall
