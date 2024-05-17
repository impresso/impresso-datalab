import React from "react"
import "./CollectionCard.css"
import { useDataStore } from "../store"
import NotebookCard from "./NotebookCard"

const CollectionCard = ({ name, children, map }) => {
  const [, getCollectionByName] = useDataStore((state) => [
    state.isReady,
    state.getCollectionByName,
  ])
  const collection = getCollectionByName(name)
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
      {map === true ? (
        <div className="map-bg">
          <div className="overlay"></div>
          <img src="img/map.jpg" alt="map" />
        </div>
      ) : null}
    </div>
  )
}

export default CollectionCard
