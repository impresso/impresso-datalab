import { marked } from "marked"
import "./MarkdownSnippet.css"

export interface MarkdownSnippetProps {
  value?: string
  className?: string
}

const MarkdownSnippet: React.FC<MarkdownSnippetProps> = ({
  value = "",
  className = "",
}) => {
  const content = marked.parse(value)
  return (
    <div
      className={`MarkdownSnippet ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

export default MarkdownSnippet
