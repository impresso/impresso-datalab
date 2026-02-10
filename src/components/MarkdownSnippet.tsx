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
  marked.use({
    renderer: {
      heading(token) {
        const id = token.text
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")

        return `<h${token.depth} id="${id}">
          <a href="#${id}" class="heading-link">${token.text}</a>
        </h${token.depth}>`
      },
    },
  })
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
