interface LinkProps extends React.HTMLProps<HTMLAnchorElement> {
  to: string
  children: React.ReactNode
}

const Link: React.FC<LinkProps> = ({ to = "/", children }) => {
  const href = [import.meta.env.PUBLIC_IMPRESSO_DATALAB_BASE, to]
    .join("/")
    .replace(/\/+/g, "/")

  return (
    <a href={href} className="text-decoration-none text-reset">
      {children}
    </a>
  )
}

export default Link
