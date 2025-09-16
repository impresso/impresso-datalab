import { useRef, useState } from "react"
import type { Dataset } from "../types"
import Page from "./Page"
import { Col, Container, Form, Row } from "react-bootstrap"
import DatasetCard from "./DatasetCard"
import { useBrowserStore, usePersistentStore } from "../store"
import { BrowserViewLogin } from "../constants"
import MarkdownSnippet from "./MarkdownSnippet"
import { DocStar, MediaImage } from "iconoir-react"

export type CorpusOverviewModalProps = {
  title?: string
  modalTitle?: string
  content: string
  displayFeatures?: boolean
  datasets: Dataset[]
}

const SortByPropAsString = (_prop: string, direction: "asc" | "desc" = "asc") =>
  function (a: Dataset, b: Dataset) {
    if (direction === "asc") {
      return a.id.localeCompare(b.id)
    } else {
      return b.id.localeCompare(a.id)
    }
  }

// const AvailableSortings = {
//   idAsc: SortByPropAsString("id", "asc"),
//   idDesc: SortByPropAsString("id", "desc"),
// }

// const FilterByMediaTitle = (identity: string) => (dataset: Dataset) =>
//   dataset.mediaTitle === identity

// const FilterByNone = () => (_dataset: Dataset) => true

// const AvailableFilterBy = {
//   mediaTitle: FilterByMediaTitle,
//   none: FilterByNone,
// }
type filterValues = {
  search: string
}

interface DatasetFilter {
  key: "search" | keyof Dataset
  accessor: (dataset: Dataset) => boolean
}

const CorpusOverviewModal: React.FC<CorpusOverviewModalProps> = ({
  modalTitle = "Impresso Corpus Catalogue",
  content,
  title,
  datasets = [],
}) => {
  const [user, userPlan] = usePersistentStore((state) => [
    state.user,
    state.userPlan,
  ])

  const setView = useBrowserStore((state) => state.setView)
  const delaySetStateTimerRef = useRef<NodeJS.Timeout | null>(null)
  const [filterBy, setFilterBy] = useState<DatasetFilter[]>([])

  const filterValuesRef = useRef<filterValues>({
    search: "",
  })

  const sortedDatasets: Dataset[] = datasets
    .filter((d: Dataset) => {
      if (filterBy.length === 0) return true
      return filterBy.every((f) => f.accessor(d))
    })
    .sort(SortByPropAsString("id", "asc"))

  const updateFilterBy = (key: keyof filterValues, value: string) => {
    filterValuesRef.current[key] = value
    console.info("[CorpusOverviewModal] @updateFilterBy", key, value)
    // handpick the fields to preview
    if (delaySetStateTimerRef.current) {
      clearTimeout(delaySetStateTimerRef.current)
    }
    delaySetStateTimerRef.current = setTimeout(() => {
      if (filterValuesRef.current.search === "") {
        setFilterBy([])
        return
      }
      setFilterBy([
        {
          key: "search",
          accessor: (d: Dataset) => {
            const q = filterValuesRef.current.search.toLocaleLowerCase()
            if (d.mediaTitle.toLocaleLowerCase().indexOf(q) > -1) {
              return true
            }
            if (d.id.toLocaleLowerCase().indexOf(q) > -1) {
              return true
            }
            return false
          },
        },
      ])
    }, 250)
  }

  return (
    <Page
      title={modalTitle}
      fullscreen="xl-down"
      size="xl"
      modalBodyClassName="pt-0 pe-2 ps-2 PlansModal mx-1"
    >
      <Container>
        <Row className="my-3">
          <Col sm={12}>
            <h1>{title}</h1>
            <MarkdownSnippet value={content} />
          </Col>
        </Row>
        <Row
          className="position-sticky top-0 d-flex align-items-bottom"
          style={{
            backgroundColor: "var(--impresso-color-paper)",
          }}
        >
          <Col sm={12}>
            <div className="pt-3 h-1px"></div>
          </Col>
          <Col sm={3} className="font-weight-medium border-end">
            <Row className="h-100">
              <Col className="border-end">Time period</Col>
              <Col>Media</Col>
            </Row>
          </Col>
          <Col sm={4}>
            <Form.Group controlId="ModalRegisterForm.email">
              <Form.Label className="font-weight-bold">
                Media title{" "}
                {filterBy.length ? (
                  <span className="font-weight-normal">
                    {sortedDatasets.length} of {datasets.length}
                  </span>
                ) : null}
              </Form.Label>
              <Form.Control
                onChange={(e) => updateFilterBy("search", e.target.value)}
                placeholder="..."
              />
            </Form.Group>
          </Col>
          <Col sm={3} className="font-weight-medium">
            Data Availability
          </Col>
          <Col sm={2} className="font-weight-medium">
            Availability for <br />
            <div
              className={`badge d-inline-block small-caps px-2 shadow-sm   ${
                user ? "bg-primary text-dark" : "bg-secondary text-paper"
              }`}
            >
              {user ? userPlan : "(guest)"}
            </div>
          </Col>
          <Col sm={3} className="font-weight-medium border-end">
            <Row className="h-100">
              <Col className="border-end"></Col>
              <Col></Col>
            </Row>
          </Col>
          <Col sm={{ offset: 4, span: 1 }}>
            <div className="very-small">Explore in Impresso App</div>
          </Col>
          <Col sm={1}>
            <DocStar />
            <div className="very-small">Export transcripts</div>
          </Col>
          <Col sm={1}>
            <MediaImage />
            <div className="very-small">Export illustrations</div>
          </Col>
          <Col sm={2}>
            <div className="very-small mt-2 mb-2 muted">
              {user ? (
                "Discover Available Datasets according to your plan"
              ) : (
                <span>
                  Please{" "}
                  <a
                    className="underline"
                    onClick={() => setView(BrowserViewLogin)}
                  >
                    log in
                  </a>{" "}
                  to view data accessibility conditions based on your plan.
                </span>
              )}
            </div>
          </Col>
          <Col sm={12}>
            <div className="border-dark pt-3 border-bottom h-1px"></div>
          </Col>
        </Row>
        {sortedDatasets.map((dataset) => (
          <DatasetCard
            dataset={dataset}
            key={dataset.id}
            className="pt-3"
            userPlan={userPlan}
          />
        ))}
      </Container>
    </Page>
  )
}

export default CorpusOverviewModal
