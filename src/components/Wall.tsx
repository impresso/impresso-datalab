import { Col, Container, Row } from "react-bootstrap"
import CollectionCard from "./CollectionCard"
import ReactCodeMirror from "@uiw/react-codemirror"
import { nord } from "@uiw/codemirror-theme-nord"
import { python } from "@codemirror/lang-python"
import { useEffect } from "react"

const CodeSample = `
from impresso import api 

print(api.version())

results = api.search("moon landing")
`

const Wall = ({
  notebooks = [],
  numberOfAuthors = 10,
  numberOfNotebooks = 100,
  numberofCollections = 2,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className="Wall mx-lg-5 mx-md-2" style={{ marginTop: 100 }}>
      <Container fluid>
        <Row>
          <Col md={{ span: 6 }} xxl={{ span: 5 }} className="align-self-center">
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
          <Col md={{ span: 6 }} xxl={{ span: 5 }}>
            <CollectionCard
              collection={{
                title: "The impresso notebooks",
                excerpt:
                  "A collection of notebooks to get you started with the impresso API",
                cover: {
                  url: "https://source.unsplash.com/800x600/?newspaper",
                  alt: "A newspaper",
                },
                notebooks: [],
              }}
            >
              <ReactCodeMirror
                value={CodeSample}
                theme={nord}
                extensions={[python()]}
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
      </Container>
    </div>
  )
}

export default Wall
