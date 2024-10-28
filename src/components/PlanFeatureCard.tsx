import { CheckCircleSolid, EyeSolid, UserBadgeCheck } from "iconoir-react"
import { OverlayTrigger, Tooltip } from "react-bootstrap"
import {
  PlanIconColors,
  PlanIconLabels,
  PlanIconPublicDomainAccessNoDownload,
  PlanIconRestrictedAccessDownload,
  PlanIconRestrictedAccessNoDownload,
} from "../constants"
import type { PlanFeature } from "./PlanCard"
const IconsByIconName: { [key: string]: React.ComponentType } = {
  [PlanIconRestrictedAccessNoDownload]: UserBadgeCheck,
  [PlanIconRestrictedAccessDownload]: UserBadgeCheck,
  [PlanIconPublicDomainAccessNoDownload]: EyeSolid,
}

const PlanFeatureCard: React.FC<{ feature: PlanFeature }> = ({ feature }) => {
  const Component = feature.icon
    ? IconsByIconName[feature.icon]
    : CheckCircleSolid
  const color = feature.icon ? PlanIconColors[feature.icon] : "purple"

  if (feature.icon) {
    return (
      <div className="PlanFeatureCard">
        <OverlayTrigger
          overlay={
            <Tooltip id="button-tooltip-2">
              <span
                dangerouslySetInnerHTML={{
                  __html: PlanIconLabels[feature.icon],
                }}
              />
            </Tooltip>
          }
        >
          <Component color={color} />
        </OverlayTrigger>
      </div>
    )
  }

  return <Component color={color} />
}

export default PlanFeatureCard
