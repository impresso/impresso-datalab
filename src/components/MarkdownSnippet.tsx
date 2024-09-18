import { marked } from "marked"

export interface MarkdownSnippetProps {
  value?: string
  className?: string
}

const MarkdownSnipped: React.FC<MarkdownSnippetProps> = ({
  value = "",
  className = "",
}) => {
  const content = marked.parse(value)
  return (
    <div
      className={`MarkdownSnipped ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

export default MarkdownSnipped
