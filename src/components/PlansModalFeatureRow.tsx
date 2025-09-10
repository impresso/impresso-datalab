import { Xmark } from "iconoir-react"
import { Row, Col } from "react-bootstrap"
import PlanFeatureCard from "./PlanFeatureCard"
import type { Plan } from "../types"

const BootstrapColumnLayoutForLabels = {
  lg: 2,
  className: "very-small",
}

export type PlansModalFeatureRowProps = {
  plans: Plan[]
  label: string
  featureIds?: string[]
  className?: string
}

const PlansModalFeatureRow: React.FC<PlansModalFeatureRowProps> = ({
  label = "",
  featureIds = [],
  plans = [],
  className = "",
}) => {
  return (
    <Row className={`PlansModalFeatureRow ${className}`}>
      <Col
        {...BootstrapColumnLayoutForLabels}
        dangerouslySetInnerHTML={{
          __html: label,
        }}
      ></Col>
      {plans.map((plan) => {
        return (
          <Col key={plan.id}>
            <Row className="d-flex align-items-center h-100">
              {featureIds.map((ref, i) => {
                const feature = plan.features.find((f) => f.ref === ref)
                const hasBorder =
                  featureIds.length > 1 && i < featureIds.length - 1
                return (
                  <Col
                    key={i}
                    className={`d-flex justify-content-center align-items-center ${
                      hasBorder ? "" : "border-end"
                    }`}
                  >
                    {feature ? (
                      <PlanFeatureCard feature={feature} />
                    ) : (
                      <Xmark />
                    )}
                  </Col>
                )
              })}
            </Row>
          </Col>
        )
      })}
    </Row>
  )
}
export default PlansModalFeatureRow
