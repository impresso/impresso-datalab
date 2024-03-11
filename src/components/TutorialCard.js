import React from "react"
import "./TutorialCard.css"
import { useDataStore } from "../store"

const TutorialCard = ({ name }) => {
  const getTutorialByName = useDataStore((state) => state.getTutorialByName)
  const tutorial = getTutorialByName(name)
  const ratio = tutorial
    ? tutorial.video.thumbnail_height / tutorial.video.thumbnail_width
    : 1.0
  const thumbnail = tutorial
    ? tutorial.video.thumbnail_url
    : "https://via.placeholder.com/1280x720"
  return (
    <div className="TutorialCard d-inline-block">
      <section className="p-3">
        <h3>{tutorial?.title}</h3>
        <p>{tutorial?.excerpt}</p>
      </section>
      <figure
        className="m-0 position-relative"
        style={{
          paddingTop: `${ratio * 100}%`,
        }}
      >
        <img
          className="position-absolute top-0 w-100 h-100"
          src={thumbnail}
          alt={tutorial?.title}
        />
        <figcaption className="position-absolute bottom-0 end-0 p-2 bg-dark text-white">
          {tutorial?.video.duration}
        </figcaption>
      </figure>
      <p className="mt-3 mx-3">In this tutorial:</p>
      <ol className="mb-3 mx-3">
        {tutorial?.tableOfContents.items.map((d, i) => (
          <li key={i} className="mt-2">
            {d.title}
          </li>
        ))}
      </ol>
    </div>
  )
}
export default TutorialCard
