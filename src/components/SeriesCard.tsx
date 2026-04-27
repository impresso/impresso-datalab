import "./SeriesCard.css"
import NotebookCard from "./NotebookCard.tsx"
import MarkdownSnippet from "./MarkdownSnippet.tsx"
import type { DataProvider, Series, Task } from "../types"
import TaskCard from "./TaskCard.tsx"
import DataProviderCard from "./DataProviderCard.tsx"

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
      <section className="pt-3 px-3">
        <h2>{series.title}</h2>
        <h3>{series.excerpt}</h3>
        {series.body ? <MarkdownSnippet value={series.body} /> : null}
        {children}
      </section>
      {series.tasks && series.tasks.length > 0 && (
        <ol className="mx-3">
          {series.tasks
            ?.filter((task) => task && !task.draft)
            .map((task: Task) => (
              <li key={task.id} className="mt-2">
                <TaskCard task={task} />
              </li>
            ))}
        </ol>
      )}
      {series.dataProviders && series.dataProviders.length > 0 && (
        <ol className="mx-3">
          {series.dataProviders
            ?.filter((dataProvider) => dataProvider)
            .map((dataProvider: DataProvider) => (
              <li key={dataProvider.id} className="mt-2">
                <DataProviderCard dataProvider={dataProvider} />
              </li>
            ))}
        </ol>
      )}
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
