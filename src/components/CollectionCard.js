import React from "react"
import "./CollectionCard.css"
import { useDataStore } from "../store"
import NotebookCard from "./NotebookCard"

const CollectionCard = ({ name, children }) => {
  const [, getCollectionByName] = useDataStore((state) => [
    state.isReady,
    state.getCollectionByName,
  ])
  const collection = getCollectionByName(name)
  const hasCover = !!collection?.cover?.url
  return (
    <div className="CollectionCard d-flex flex-column">
      <section className="p-3">
        <h2>{collection?.title}</h2>
        <p>{collection?.excerpt}</p>
        {children}
      </section>
      <ol className="mb-3 mx-3">
        {collection?.notebooks.map((name, i) => (
          <li key={i} className="mt-2">
            <NotebookCard name={name} />
          </li>
        ))}
      </ol>
      {hasCover && (
        <div className="map-bg">
          <div className="overlay"></div>
          <img src={collection.cover.url} alt={collection.cover.alt} />
        </div>
      )}
    </div>
  )
}

export default CollectionCard
