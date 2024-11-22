import { Xmark } from "iconoir-react"
import { Row, Col } from "react-bootstrap"
import PlanFeatureCard from "./PlanFeatureCard"
import type { Plan } from "./PlanCard"

const BootstrapColumnLayoutForLabels = {
  lg: 2,
  className: "very-small",
}

export type PlansModalFeatureRowProps = {
  plans: Plan[]
  label?: string
  featureId?: string
  className?: string
}

const PlansModalFeatureRow: React.FC<PlansModalFeatureRowProps> = ({
  label = "",
  featureId = "",
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
        const feature = plan.features.find((d) => d.ref === featureId)
        return (
          <Col
            className="d-flex justify-content-center align-items-center "
            key={plan.id}
          >
            {feature ? <PlanFeatureCard feature={feature} /> : <Xmark />}
          </Col>
        )
      })}
    </Row>
  )
}
export default PlansModalFeatureRow
