import { marked } from "marked"
import "./MarkdownSnippet.css"

export interface MarkdownSnippetProps {
  value?: string
  className?: string
  onClick?: () => void
}

const MarkdownSnippet: React.FC<MarkdownSnippetProps> = ({
  value = "",
  className = "",
  onClick,
}) => {
  const content = marked.parse(value)
  return (
    <div
      onClick={onClick}
      className={`MarkdownSnippet ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

export default MarkdownSnippet
