import React from "react"
import { marked } from "marked"

const Markdown = ({ children }) => {
  console.log("[Markdown] render")
  // remove the most common zerowidth characters from the start of the file
  const content = marked.parse(String(children))

  return <div dangerouslySetInnerHTML={{ __html: content }} />
}

export default Markdown
