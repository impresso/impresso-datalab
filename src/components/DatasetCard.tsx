import type { FC } from "react"
import type { Dataset } from "../types"
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap"
import { CheckCircleSolid, Xmark, XmarkCircleSolid } from "iconoir-react"
import {
  PlanAvailabilityLabels,
  PlanEducational,
  PlanGuest,
  PlanImpressoUser,
  PlanNone,
  PlanResearcher,
} from "../constants"

export type DatasetCardProps = {
  dataset: Dataset
  userPlan?: string
  className?: string
}

const compareDatasetPlanWithUserPlan = (
  userPlan: string,
  datasetPlan: string
) => {
  if (userPlan === datasetPlan || datasetPlan === PlanGuest) {
    return <CheckCircleSolid color="green" />
  }
  if (
    [PlanGuest, PlanImpressoUser].includes(datasetPlan) &&
    [PlanImpressoUser, PlanResearcher, PlanEducational].includes(userPlan)
  ) {
    return <CheckCircleSolid color="green" />
  }
  if (datasetPlan === PlanNone) {
    return (
      <OverlayTrigger
        overlay={
          <Tooltip id="button-tooltip-3">
            <span> This feature is not yet avalable to any plan</span>
          </Tooltip>
        }
      >
        <XmarkCircleSolid />
      </OverlayTrigger>
    )
  }

  return (
    <OverlayTrigger
      overlay={
        <Tooltip id="button-tooltip-3">
          <span>{PlanAvailabilityLabels[datasetPlan] ?? datasetPlan}</span>
        </Tooltip>
      }
    >
      <Xmark />
    </OverlayTrigger>
  )
}

const DatasetCard: FC<DatasetCardProps> = ({
  dataset,
  userPlan = PlanGuest,
  className = "",
}) => {
  // translate
  return (
    <Row key={dataset.id} className={`DatasetCard ${className}`}>
      <Col sm={1}>{dataset.startYear}</Col>
      <Col sm={1}>{dataset.endYear}</Col>
      <Col sm={2}>{dataset.medium}</Col>
      <Col sm={5}>
        <h3 className="font-size-inherit mb-1">
          {dataset.mediaTitle} &mdash; {dataset.associatedPartner}
        </h3>
        <div className="d-flex">
          <div className="small-caps">{dataset.media}</div>
        </div>
        {dataset.permittedUse}
      </Col>

      {[
        dataset.minimumUserPlanRequiredToExploreInWebapp,
        dataset.minimumUserPlanRequiredToExportTranscripts,
        dataset.minimumUserPlanRequiredToExportIllustration,
      ].map((plan, i) => (
        <Col key={i} sm={1}>
          {compareDatasetPlanWithUserPlan(userPlan, plan)}
        </Col>
      ))}

      <Col sm={12}>
        <div className="pt-3 border-bottom h-1px"></div>
      </Col>
    </Row>
  )
}

export default DatasetCard
