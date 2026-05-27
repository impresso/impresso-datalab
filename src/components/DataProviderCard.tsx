import "./DataProviderCard.css"
import { ArrowRight } from "iconoir-react"
import type { DataProvider } from "../types"
import { marked } from "marked"
import Link from "./Link"

interface DataProviderWithHref extends DataProvider {
  href?: string
}

interface DataProviderCardLinkConfig {
  href: string
  isExternal: boolean
}

interface DataProviderCardProps {
  dataProvider: DataProviderWithHref
  children?: React.ReactNode
  className?: string
}

const getPrimaryLink = (
  dataProvider: DataProviderWithHref,
): DataProviderCardLinkConfig | null => {
  if (dataProvider.href) {
    return { href: dataProvider.href, isExternal: false }
  }

  const externalUrl = dataProvider.links?.[0]?.url
  if (externalUrl) {
    return { href: externalUrl, isExternal: true }
  }

  return null
}

const DataProviderCard: React.FC<DataProviderCardProps> = ({
  dataProvider,
  children,
  className = "",
}) => {
  if (!dataProvider) {
    console.error("[DataProviderCard] - dataProvider is not defined")
    return null
  }

  const primaryLink = getPrimaryLink(dataProvider)

  return (
    <div className={`DataProviderCard shadow-sm ${className}`}>
      <div className="px-3 py-2 d-flex align-items-center">
        <div>
          {dataProvider.href ? (
            <Link to={dataProvider.href}>
              <h3 className="mx-0 my-2">
                <span className="badge bg-secondary me-2 very-small-caps-medium">
                  data provider
                </span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: marked.parseInline(dataProvider?.title ?? "", {}),
                  }}
                ></span>
              </h3>
            </Link>
          ) : (
            <h3 className="mx-0 my-2">
              <span className="badge bg-secondary me-2 very-small-caps-medium">
                data provider
              </span>
              <span
                dangerouslySetInnerHTML={{
                  __html: marked.parseInline(dataProvider?.title ?? "", {}),
                }}
              ></span>
            </h3>
          )}

          <p className="small text-muted mb-2">{dataProvider.provider}</p>

          <div className="small mb-2">
            <span className="badge bg-primary me-2">{dataProvider.type}</span>
            {dataProvider.acronym && (
              <span className="badge bg-secondary">{dataProvider.acronym}</span>
            )}
          </div>

          {children}
        </div>
        {primaryLink &&
          (primaryLink.isExternal ? (
            <a
              href={primaryLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="ms-auto link-button"
            >
              <ArrowRight strokeWidth={2} />
            </a>
          ) : (
            <Link to={primaryLink.href} className="ms-auto link-button">
              <ArrowRight strokeWidth={2} />
            </Link>
          ))}
      </div>
    </div>
  )
}

export default DataProviderCard
