import { Fragment } from "react"
import Page from "./Page"
// import PlanCard from "./PlanCard"
import { Col, Container, OverlayTrigger, Row, Tooltip } from "react-bootstrap"
import type { Plan } from "./PlanCard"
import { usePersistentStore } from "../store"
import {
  PlanGuest,
  PlanImpressoUser,
  GenericFeatureLabels,
  RequirementsLabels,
  DataFeatureLabels,
  RequirementToU,
} from "../constants"
import {
  CheckCircleSolid,
  CheckCircle,
  Minus,
  WarningCircle,
  Xmark,
} from "iconoir-react"
import "./PlansModal.css"

const BootstrapColumnLayoutForLabels = {
  lg: 2,
  className: "very-small",
}

export type PlansModalProps = {
  plans: Plan[]
}

const PlansModal: React.FC<PlansModalProps> = ({ plans = [] }) => {
  const [user, acceptedTermsDate] = usePersistentStore((state) => [
    state.user,
    state.acceptTermsDate,
  ])

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
              className="py-3 d-flex align-items-center justify-content-center"
              key={plan.id}
            >
              <h2 className="m-0 font-weight-bold text-center">
                {plan.title}
                {plan.id === useActivePlan ? (
                  <div className="badge small-caps mt-2 shadow-sm bg-primary text-dark">
                    current plan
                  </div>
                ) : null}
              </h2>
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
                          className="d-block mt-2 mb-0 very-small text-muted"
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
        {Object.keys(RequirementsLabels).map((key) => (
          <Row className="PlansModal__hRow" key={key}>
            <Col
              {...BootstrapColumnLayoutForLabels}
              dangerouslySetInnerHTML={{ __html: RequirementsLabels[key] }}
            ></Col>
            {plans.map((plan) => (
              <Col
                className="d-flex justify-content-center align-items-center"
                key={plan.id}
              >
                {key === RequirementToU && acceptedTermsDate ? (
                  <CheckCircle color="green" />
                ) : plan.requirements.includes(key) ? (
                  <WarningCircle />
                ) : (
                  <Minus />
                )}
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
        {Object.keys(DataFeatureLabels).map((key, i) => (
          <Fragment key={key}>
            <Row className="PlansModal__hRow">
              <Col
                {...BootstrapColumnLayoutForLabels}
                dangerouslySetInnerHTML={{ __html: DataFeatureLabels[key] }}
              ></Col>
              {plans.map((plan) => {
                const feature = plan.features.find((d) => d.ref === key)
                return (
                  <Col
                    className="d-flex justify-content-center align-items-center "
                    key={plan.id}
                  >
                    {feature ? (
                      <OverlayTrigger
                        overlay={
                          <Tooltip id="button-tooltip-2">
                            <span
                              dangerouslySetInnerHTML={{
                                __html:
                                  feature.title ??
                                  "Access & download available",
                              }}
                            />
                          </Tooltip>
                        }
                      >
                        <CheckCircleSolid
                          color={feature.iconColor ?? "purple"}
                        />
                      </OverlayTrigger>
                    ) : (
                      <Xmark />
                    )}
                  </Col>
                )
              })}
            </Row>
            {i % 2 ? (
              <Row>
                <Col className="pt-1 mb-1 border-bottom border-dark border-dotted" />
              </Row>
            ) : null}
          </Fragment>
        ))}
      </Container>
    </Page>
  )
}

export default PlansModal
