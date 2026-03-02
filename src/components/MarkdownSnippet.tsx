import { marked } from "marked"
import GithubSlugger from "github-slugger"
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
  const slugger = new GithubSlugger()
  const renderer = new marked.Renderer()
  renderer.heading = function heading(token) {
    const headingText = this.parser.parseInline(token.tokens)
    const id = slugger.slug(token.text)
    const depth = Math.max(2, token.depth)

    return `<h${depth} id="${id}">
      <a href="#${id}" class="heading-link">${headingText}</a>
    </h${depth}>`
  }

  const content = marked.parse(value, {
    renderer,
  })
  return (
    <div
      onClick={onClick}
      className={`MarkdownSnippet ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

export default MarkdownSnippet
