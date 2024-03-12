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
  return (
    <div className="CollectionCard d-inline-block">
      <section className="p-3">
        <h3>{collection?.title}</h3>
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
    </div>
  )
}

export default CollectionCard
