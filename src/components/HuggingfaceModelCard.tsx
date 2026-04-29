import "./HuggingfaceModelCard.css"

interface HuggingfaceModelCardProps {
  url: string
  className?: string
}

const MODELS_SHIELD_URL =
  "https://img.shields.io/badge/%F0%9F%A4%97%20Hugging%20Face-Models-blue"

const FALLBACK_TITLE = "Hugging Face Model"

function getModelTitle(urlOrSlug: string): string {
  const trimmedValue = urlOrSlug.trim()
  if (!trimmedValue) {
    return FALLBACK_TITLE
  }

  if (!trimmedValue.includes("://")) {
    return trimmedValue
  }

  try {
    const parsedUrl = new URL(trimmedValue)
    const segments = parsedUrl.pathname.split("/").filter(Boolean)
    if (segments.length >= 2) {
      return `${decodeURIComponent(segments[0])}/${decodeURIComponent(segments[1])}`
    }

    return FALLBACK_TITLE
  } catch {
    return FALLBACK_TITLE
  }
}

function getModelUrl(urlOrSlug: string): string {
  const trimmedValue = urlOrSlug.trim()
  if (!trimmedValue) {
    return "https://huggingface.co"
  }

  if (trimmedValue.includes("://")) {
    return trimmedValue
  }

  return `https://huggingface.co/${trimmedValue.replace(/^\/+/, "")}`
}

const HuggingfaceModelCard: React.FC<HuggingfaceModelCardProps> = ({
  url,
  className = "",
}) => {
  const title = getModelTitle(url)
  const modelUrl = getModelUrl(url)

  return (
    <article className={`HuggingfaceModelCard shadow-sm ${className}`}>
      <div className="HuggingfaceModelCard__content">
        <a
          className="HuggingfaceModelCard__badge"
          href={modelUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={MODELS_SHIELD_URL} alt="Hugging Face Models" />
        </a>
        <h3 className="HuggingfaceModelCard__title">
          <a href={modelUrl} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </h3>
      </div>
    </article>
  )
}

export default HuggingfaceModelCard
