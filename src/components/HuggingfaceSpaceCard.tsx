import "./HuggingfaceSpaceCard.css"

interface HuggingfaceSpaceCardProps {
  url: string
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

const HuggingfaceSpaceCard: React.FC<HuggingfaceSpaceCardProps> = ({
  url,
  className = "",
}) => {
  const title = deriveSpaceTitle(url)

  return (
    <article className={`HuggingfaceSpaceCard shadow-sm ${className}`}>
      <div className="HuggingfaceSpaceCard__content">
        <a
          className="HuggingfaceSpaceCard__badge"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={SPACES_SHIELD_URL} alt="Hugging Face Spaces" />
        </a>
        <h3 className="HuggingfaceSpaceCard__title">
          <a href={url} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </h3>
      </div>
    </article>
  )
}

export default HuggingfaceSpaceCard
