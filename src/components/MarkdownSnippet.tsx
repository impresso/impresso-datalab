import { marked } from "marked"
import GithubSlugger from "github-slugger"
import "./MarkdownSnippet.css"

const UrlWithCustomCSSClass: {
  url: string
  className: string
  badge: string
}[] = [
  {
    url: "https://impresso.readthedocs.io/",
    className: "LinkAsCard",
    badge: "Py → Docs",
  },
  {
    url: "https://huggingface.co/spaces/impresso-project/",
    className: "LinkAsCard",
    badge: "HF → spaces",
  },
  {
    url: "https://huggingface.co/impresso-project/",
    className: "LinkAsCard",
    badge: "HF",
  },
]

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

  renderer.link = function link(token) {
    const href = token.href
    const text = this.parser.parseInline(token.tokens)
    const title = token.title ? ` title="${token.title}"` : ""

    for (const { url, className, badge } of UrlWithCustomCSSClass) {
      if (href.includes(url)) {
        const textContent: string = text.replace(url, "").trim()
        return `<a href="${href}" class="${className}" target="_blank" rel="noopener noreferrer"${title}>
            <span class="small-caps badge">${badge}</span> 
            <span>${textContent}</span>
        </a>`
      }
    }

    return `<a href="${href}"${title}>${text}</a>`
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
