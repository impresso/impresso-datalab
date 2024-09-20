import React from "react"
import "./CollectionCard.css"
import NotebookCard, { type Notebook } from "./NotebookCard.tsx"
import MarkdownSnippet from "./MarkdownSnippet.tsx"
export interface Collection {
  title: string
  excerpt: string
  body?: string
  cover?:
    | {
        url: string
        alt: string
      }
    | null
    | undefined
  notebooks: Notebook[]
}

/**
 * Props for the CollectionCard component.
 *
 * @interface CollectionCardProps
 * @extends {React.HTMLProps<HTMLDivElement>}
 *
 * @property {Collection} collection - The collection data to be displayed in the card.
 */
export interface CollectionCardProps extends React.HTMLProps<HTMLDivElement> {
  collection: Collection
}

const CollectionCard: React.FC<CollectionCardProps> = ({
  collection,
  children,
}) => {
  const hasCover = collection.cover?.url
  return (
    <div className="CollectionCard d-flex flex-column">
      <section className="p-3">
        <h2>{collection.title}</h2>
        <h3>{collection.excerpt}</h3>
        {collection.body ? <MarkdownSnippet value={collection.body} /> : null}
        {children}
      </section>
      <ol className="mb-3 mx-3">
        {collection.notebooks.map((notebook) => (
          <li key={notebook.href} className="mt-2">
            <NotebookCard notebook={notebook} />
          </li>
        ))}
      </ol>
      {hasCover && (
        <div className="map-bg">
          <div className="overlay"></div>
          <img src={collection.cover?.url} alt={collection.cover?.alt} />
        </div>
      )}
    </div>
  )
}

export default CollectionCard
