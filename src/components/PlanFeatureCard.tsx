import { CheckCircleSolid, EyeSolid, UserBadgeCheck } from "iconoir-react"
import { OverlayTrigger, Tooltip } from "react-bootstrap"
import {
  PlanIconColors,
  PlanIconPublicDomainAccessNoDownload,
  PlanIconRestrictedAccessDownload,
  PlanIconRestrictedAccessNoDownload,
} from "../constants"
import type { PlanFeature } from "../types"
const IconsByIconName: { [key: string]: React.ComponentType } = {
  [PlanIconRestrictedAccessNoDownload]: UserBadgeCheck,
  [PlanIconRestrictedAccessDownload]: UserBadgeCheck,
  [PlanIconPublicDomainAccessNoDownload]: EyeSolid,
}

const TooltipByIconName: { [key: string]: string } = {
  [PlanIconRestrictedAccessNoDownload]:
    "Restricted access, no download available.",
  [PlanIconRestrictedAccessDownload]: "Restricted access, download available.",
  [PlanIconPublicDomainAccessNoDownload]:
    "Public domain access, no download available.",
}

const PlanFeatureCard: React.FC<{ feature: PlanFeature }> = ({ feature }) => {
  const Component = feature.icon
    ? IconsByIconName[feature.icon]
    : CheckCircleSolid
  const color = feature.icon ? PlanIconColors[feature.icon] : "purple"
  const tooltip = feature.icon
    ? TooltipByIconName[feature.icon]
    : "Feature available"

  return (
    <div className="PlanFeatureCard">
      <OverlayTrigger
        overlay={
          <Tooltip id="button-tooltip-2">
            <span
              dangerouslySetInnerHTML={{
                __html: tooltip,
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

export default PlanFeatureCard
