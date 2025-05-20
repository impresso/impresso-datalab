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
  DataFeatureMetadata,
  DataFeatureAudioPublicDomain,
  DataFeatureFacsimilesPublicDomain,
  DataFeatureTranscriptsPublicDomain,
  DataFeatureImages,
  DataFeatureImagesPublicDomain,
  DataFeatureSemanticEnrichments,
  DataFeatureFacsimiles,
  DataFeatureAudio,
  DataFeatureTranscripts,
  ExportFeatureFacsimilesPublicDomain,
  ExportFeatureAudioPublicDomain,
  ExportFeatureTranscriptsPublicDomain,
  ExportFeatureImagesPublicDomain,
  ExportFeatureMetadata,
  ExportFeatureFacsimiles,
  ExportFeatureAudio,
  ExportFeatureTranscripts,
  ExportFeatureImages,
  ExportFeatureSemanticEnrichments,
  RequirementProofStudentEnrollment,
  RequirementImpressoAccount,
  RequirementsTooltips,
} from "../constants"
import {
  CheckCircleSolid,
  CheckCircle,
  Minus,
  WarningCircle,
  Xmark,
} from "iconoir-react"
import "./PlansModal.css"
import MarkdownSnippet from "./MarkdownSnippet"
import PlansModalFeatureRow from "./PlansModalFeatureRow"

const BootstrapColumnLayoutForLabels = {
  lg: 2,
  className: "very-small",
}

export type PlansModalProps = {
  plans: Plan[]
  title?: string
  modalTitle?: string
  content: string
  displayFeatures?: boolean
}

const PlansModal: React.FC<PlansModalProps> = ({
  plans = [],
  title = "Plans",
  modalTitle = "Choose a plan",
  content = "Choose the plan that best fits your needs.",
  displayFeatures = false,
}) => {
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
      title={modalTitle}
      fullscreen="xl-down"
      size="xxl"
      modalBodyClassName="pt-0 pe-4 ps-2 PlansModal mx-1"
    >
      <Container>
        <Row className="my-3">
          <Col sm={12}>
            <h1>{title}</h1>
            <MarkdownSnippet value={content} />
          </Col>
        </Row>
        <Row
          className="position-sticky top-0"
          style={{
            backgroundColor: "var(--impresso-color-paper)",
          }}
        >
          <Col {...BootstrapColumnLayoutForLabels}></Col>
          {plans.map((plan) => (
            <Col className="py-3 d-flex align-items-end" key={plan.id}>
              <h2 className="m-0 font-weight-bold">
                {plan.title}
                {plan.id === useActivePlan ? (
                  <div className="badge d-block small-caps mt-2 shadow-sm bg-primary text-dark">
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

        {displayFeatures &&
          Object.keys(GenericFeatureLabels).map((i) => (
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
                        <CheckCircleSolid
                          color={feature.iconColor ?? "purple"}
                        />
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
            <h4 className="mt-2">Requirements</h4>
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
                  <OverlayTrigger
                    overlay={
                      <Tooltip>
                        <span
                          dangerouslySetInnerHTML={{
                            __html:
                              RequirementsTooltips[key] || "Action Required.",
                          }}
                        ></span>
                      </Tooltip>
                    }
                  >
                    <WarningCircle />
                  </OverlayTrigger>
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
        <Row
          className="position-sticky border-bottom border-dark border-dotted"
          style={{
            top: 90,
            backgroundColor: "var(--impresso-color-paper)",
          }}
        >
          <Col>
            <h4 className="mt-2">Data Accessibility</h4>
          </Col>
          {plans.map((plan) => (
            <Col key={plan.id}>
              <Row>
                <Col>
                  <h4 className="very-small mt-2 text-center">
                    Explore (Impresso WebApp)
                  </h4>
                </Col>
                <Col>
                  <h4 className="very-small mt-2 text-center">
                    Export (Impresso WebApp & Datalab)
                  </h4>
                </Col>
              </Row>
            </Col>
          ))}
        </Row>
        <Row>
          <Col className="pt-1 mb-1 ">
            <h4 className="font-size-inherit mt-2">Metadata</h4>
          </Col>
        </Row>
        {/* DataFeatureMetadata */}
        <PlansModalFeatureRow
          plans={plans}
          label={DataFeatureLabels[DataFeatureMetadata]}
          featureIds={[DataFeatureMetadata, ExportFeatureMetadata]}
          className="PlansModal__hRow"
        ></PlansModalFeatureRow>
        <Row>
          <Col className="pt-1 mb-1 border-top border-dark border-dotted">
            <h4 className="font-size-inherit mt-2">Public Data Domain</h4>
          </Col>
        </Row>
        {[
          [
            DataFeatureFacsimilesPublicDomain,
            ExportFeatureFacsimilesPublicDomain,
          ],
          [DataFeatureAudioPublicDomain, ExportFeatureAudioPublicDomain],
          [
            DataFeatureTranscriptsPublicDomain,
            ExportFeatureTranscriptsPublicDomain,
          ],
          [DataFeatureImagesPublicDomain, ExportFeatureImagesPublicDomain],
        ].map(([keyData, keyExport]) => (
          <PlansModalFeatureRow
            key={keyData}
            plans={plans}
            label={DataFeatureLabels[keyData]}
            featureIds={[keyData, keyExport]}
            className="PlansModal__hRow"
          />
        ))}
        <Row>
          <Col className="pt-1 mb-1 border-top border-dark border-dotted">
            <h4 className="font-size-inherit mt-2">Protected Data Domain</h4>
          </Col>
        </Row>
        {[
          [DataFeatureFacsimiles, ExportFeatureFacsimiles],
          [DataFeatureAudio, ExportFeatureAudio],
          [DataFeatureTranscripts, ExportFeatureTranscripts],
          [DataFeatureImages, ExportFeatureImages],
        ].map(([keyData, keyExport]) => (
          <PlansModalFeatureRow
            key={keyData}
            plans={plans}
            label={DataFeatureLabels[keyData]}
            featureIds={[keyData, keyExport]}
            className="PlansModal__hRow"
          />
        ))}
        <Row>
          <Col className="pt-1 mb-1 border-top border-dark border-dotted">
            <h4 className="font-size-inherit mt-2">Semantic Enrichments</h4>
          </Col>
        </Row>
        <PlansModalFeatureRow
          plans={plans}
          label={DataFeatureLabels[DataFeatureSemanticEnrichments]}
          featureIds={[
            DataFeatureSemanticEnrichments,
            ExportFeatureSemanticEnrichments,
          ]}
          className="PlansModal__hRow"
        />
      </Container>
    </Page>
  )
}

export default PlansModal
