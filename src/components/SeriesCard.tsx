import "./SeriesCard.css"
import NotebookCard from "./NotebookCard.tsx"
import MarkdownSnippet from "./MarkdownSnippet.tsx"
import type { Series } from "../types"

/**
 * Props for the SeriesCard component.
 *
 * @interface SeriesCardProps
 * @extends {React.HTMLProps<HTMLDivElement>}
 *
 * @property {Series} series - The series data to be displayed in the card.
 */
export interface SeriesCardProps extends React.HTMLProps<HTMLDivElement> {
  series: Series
}

const SeriesCard: React.FC<SeriesCardProps> = ({
  className = "",
  series,
  children,
}) => {
  if (!series) {
    console.error("[SeriesCard] - series is not defined")
    return null
  }
  const hasCover = series.cover?.url
  return (
    <div className={`SeriesCard d-flex flex-column ${className}`}>
      <section className="p-3">
        <h2>{series.title}</h2>
        <h3>{series.excerpt}</h3>
        {series.body ? <MarkdownSnippet value={series.body} /> : null}
        {children}
      </section>
      <ol className="mb-3 mx-3">
        {series.notebooks
          .filter((notebook) => !notebook.draft)
          .map((notebook) => (
            <li key={notebook.href} className="mt-2">
              <NotebookCard notebook={notebook} />
            </li>
          ))}
      </ol>
      {hasCover && (
        <div className="map-bg">
          <div className="overlay"></div>
          <img src={series.cover?.url} alt={series.cover?.alt} />
        </div>
      )}
    </div>
  )
}

export default SeriesCard
