import "./HuggingfaceSpaceCard.css"
import type { HuggingfaceSpace } from "../types"
import TimeAgo from "./TimeAgo"

interface HuggingfaceSpaceCardProps {
  huggingfaceSpace: HuggingfaceSpace
  className?: string
}

const SPACES_SHIELD_URL =
  "https://img.shields.io/badge/%F0%9F%A4%97%20Hugging%20Face-Spaces-blue"

const FALLBACK_TITLE = "Hugging Face Space"

function toTitleCase(value: string): string {
  return value
    .split(/[-_]+/g)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

function deriveSpaceTitle(url: string): string {
  try {
    const parsedUrl = new URL(url)
    const segments = parsedUrl.pathname.split("/").filter(Boolean)
    const lastSegment = segments[segments.length - 1]
    if (!lastSegment) {
      return FALLBACK_TITLE
    }

    const decodedSegment = decodeURIComponent(lastSegment)
    return toTitleCase(decodedSegment)
  } catch {
    return FALLBACK_TITLE
  }
}

function buildSpaceUrl(huggingfaceSpace: HuggingfaceSpace): string {
  const { host, id, subdomain } = huggingfaceSpace

  if (subdomain) {
    return `https://${subdomain}.hf.space`
  }

  const normalizedHost = host.startsWith("http") ? host : `https://${host}`
  return `${normalizedHost.replace(/\/+$/, "")}/spaces/${id}`
}

const HuggingfaceSpaceCard: React.FC<HuggingfaceSpaceCardProps> = ({
  huggingfaceSpace,
  className = "",
}) => {
  const url = buildSpaceUrl(huggingfaceSpace)
  const colorFrom = huggingfaceSpace.cardData.colorFrom || "#ffffff"
  const colorTo = huggingfaceSpace.cardData.colorTo || "#f4f4f4"
  const title =
    huggingfaceSpace.cardData.title ||
    deriveSpaceTitle(url) ||
    deriveSpaceTitle(huggingfaceSpace.id)

  return (
    <div className={`HuggingfaceSpaceCard shadow-sm py-2 px-3 ${className}`}>
      <div
        className="HuggingfaceSpaceCard__background"
        style={{
          backgroundImage: `linear-gradient(30deg, ${colorFrom}, ${colorTo})`,
          opacity: 0.32,
        }}
      />
      <div className="HuggingfaceSpaceCard__content">
        <a
          className="m-0 "
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={SPACES_SHIELD_URL} alt="Hugging Face Spaces" />
        </a>
        <span
          className="HuggingfaceSpaceCard__sdk badge border text-muted small mx-2 py-0 px-2"
          style={{
            lineHeight: "18px",
          }}
        >
          License: {huggingfaceSpace.cardData.license || "Unknown License"}
        </span>
        <h3 className="HuggingfaceSpaceCard__title font-size-inherit m-0">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="small text-decoration-underline"
          >
            <span className="HuggingfaceSpaceCard__emoji small me-1">
              {huggingfaceSpace.cardData.emoji}
            </span>
            {title}
          </a>
        </h3>
        {huggingfaceSpace.cardData.short_description && (
          <p className="HuggingfaceSpaceCard__description mt-1 mb-0 small">
            {huggingfaceSpace.cardData.short_description}
          </p>
        )}
      </div>
      <div className="very-small border-top pt-1 mt-1 d-flex justify-content-between">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className=" text-decoration-none"
        >
          {huggingfaceSpace.author}
        </a>
        <TimeAgo value={huggingfaceSpace.lastModified} />
      </div>
    </div>
  )
}

export default HuggingfaceSpaceCard
