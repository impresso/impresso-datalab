import { useRef, useState } from "react"
import type { Dataset } from "./../types"
import Page from "./Page"
import { Col, Container, Form, Row } from "react-bootstrap"
import DatasetCard from "./DatasetCard"
import { useBrowserStore, usePersistentStore } from "../store"
import { BrowserViewLogin } from "../constants"

export type DatasetModalProps = {
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

const DatasetModal: React.FC<DatasetModalProps> = ({
  modalTitle = "Datasets",
  // content,
  // displayFeatures = true,
  // title,
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
    console.info("[DatasetModal] @updateFilterBy", key, value)
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
      size="xxl"
      modalBodyClassName="pt-0 pe-2 ps-2 PlansModal mx-1"
    >
      <Container>
        <Row
          className="position-sticky top-0 d-flex align-items-bottom"
          style={{
            backgroundColor: "var(--impresso-color-paper)",
          }}
        >
          <Col sm={12}>
            <div className="pt-3 h-1px"></div>
          </Col>
          <Col sm={2} className="font-weight-medium border-end">
            Period
          </Col>
          <Col sm={2} className="font-weight-medium">
            Medium
          </Col>
          <Col sm={5}>
            <Form.Group controlId="ModalRegisterForm.email">
              <Form.Label className="font-weight-bold">
                Title{" "}
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
            <br />
            <div
              className={`badge d-inline-block small-caps px-2 shadow-sm   ${
                user ? "bg-primary text-dark" : "bg-secondary text-paper"
              }`}
            >
              {user ? userPlan : "(guest)"}
            </div>
            <div className="very-small mt-2 muted">
              {user ? (
                "See below the datasets available according to your plan"
              ) : (
                <span>
                  Please{" "}
                  <a
                    className="underline"
                    onClick={() => setView(BrowserViewLogin)}
                  >
                    login
                  </a>{" "}
                  to check data availability according to your plan
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

export default DatasetModal
