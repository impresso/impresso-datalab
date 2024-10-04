import Page from "./Page"
// import PlanCard from "./PlanCard"
import { Col, Container, Row } from "react-bootstrap"
import type { Plan } from "./PlanCard"
import { usePersistentStore } from "../store"
import {
  PlanGuest,
  PlanImpressoUser,
  GenericFeatureLabels,
  RequirementsLabels,
  DataFeatureLabels,
} from "../constants"
import { CheckCircleSolid, Minus, WarningCircle, Xmark } from "iconoir-react"
import "./PlansModal.css"

const BootstrapColumnLayoutForLabels = {
  lg: 2,
  className: "small",
}

const PlansModal: React.FC<{
  plans: Plan[]
}> = ({ plans = [] }) => {
  const user = usePersistentStore((state) => state.user)

  let useActivePlan = PlanGuest
  if (user !== null) {
    useActivePlan = PlanImpressoUser
  }
  return (
    <Page
      title="Plans for Impresso Datalab"
      fullscreen="xl-down"
      size="xl"
      modalBodyClassName="pt-0 pe-4 ps-2 PlansModal mx-1"
    >
      <Container>
        <Row
          className="position-sticky top-0"
          style={{
            backgroundColor: "var(--impresso-color-paper)",
          }}
        >
          <Col {...BootstrapColumnLayoutForLabels}></Col>
          {plans.map((plan) => (
            <Col
              className="py-3 d-flex justify-content-center align-items-center"
              key={plan.id}
            >
              <h2 className="m-0 font-weight-bold">{plan.title}</h2>
            </Col>
          ))}
          <Col sm={12}>
            <div className="border-dark border-bottom h-1px"></div>
          </Col>
        </Row>

        <Row className="my-2">
          <Col {...BootstrapColumnLayoutForLabels}></Col>
          {plans.map((plan) => (
            <Col key={plan.id}>
              <p className="small">{plan.body}</p>
            </Col>
          ))}
        </Row>

        {Object.keys(GenericFeatureLabels).map((i) => (
          <Row className="PlansModal__hRow" key={i}>
            <Col {...BootstrapColumnLayoutForLabels}>
              {GenericFeatureLabels[i]}
            </Col>
            {plans.map((plan) => {
              const feature = plan.features.find((d) => d.ref === i)
              return (
                <Col
                  className="d-flex row justify-content-center align-items-center"
                  key={plan.id}
                >
                  {feature ? (
                    <>
                      <CheckCircleSolid color={feature.iconColor ?? "purple"} />
                      {feature.title ? (
                        <p
                          className="d-block mt-2 mb-0 small text-muted"
                          dangerouslySetInnerHTML={{ __html: feature.title }}
                        ></p>
                      ) : null}
                    </>
                  ) : (
                    <Xmark />
                  )}
                </Col>
              )
            })}
          </Row>
        ))}
        <Row className="my-1">
          <Col sm={12}>
            <div className="border-dark border-bottom h-1px"></div>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3 className="font-size-inherit mt-2">Requirements</h3>
          </Col>
        </Row>
        {Object.keys(RequirementsLabels).map((i) => (
          <Row className="PlansModal__hRow" key={i}>
            <Col
              {...BootstrapColumnLayoutForLabels}
              dangerouslySetInnerHTML={{ __html: RequirementsLabels[i] }}
            ></Col>
            {plans.map((plan) => (
              <Col
                className="d-flex justify-content-center align-items-center"
                key={plan.id}
              >
                {plan.requirements.includes(i) ? <WarningCircle /> : <Minus />}
              </Col>
            ))}
          </Row>
        ))}
        <Row className="my-1">
          <Col sm={12}>
            <div className="border-dark border-bottom h-1px"></div>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3 className="font-size-inherit mt-2">Data availability</h3>
          </Col>
        </Row>
        {Object.keys(DataFeatureLabels).map((i) => (
          <Row className="PlansModal__hRow" key={i}>
            <Col {...BootstrapColumnLayoutForLabels}>
              {DataFeatureLabels[i]}
            </Col>
            {plans.map((plan) => {
              const feature = plan.features.find((d) => d.ref === i)
              return (
                <Col
                  className="d-flex row justify-content-center align-items-center"
                  key={plan.id}
                >
                  {feature ? (
                    <>
                      <CheckCircleSolid color={feature.iconColor ?? "purple"} />
                      {feature.title ? (
                        <p
                          className="d-block mt-2 mb-0 small text-center"
                          dangerouslySetInnerHTML={{ __html: feature.title }}
                        ></p>
                      ) : null}
                    </>
                  ) : (
                    <Xmark />
                  )}
                </Col>
              )
            })}
          </Row>
        ))}
      </Container>
    </Page>
  )
}

export default PlansModal
