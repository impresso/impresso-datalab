interface LinkProps extends React.HTMLProps<HTMLAnchorElement> {
  to: string
  children: React.ReactNode
  className?: string
  underline?: boolean
}

const Link: React.FC<LinkProps> = ({
  to = "/",
  children,
  className = "",
  underline = false,
}) => {
  const href = [import.meta.env.PUBLIC_IMPRESSO_DATALAB_BASE, to]
    .join("/")
    .replace(/\/+/g, "/")

  return (
    <a
      href={href}
      className={`${underline ? "text-decoration-underline" : "text-decoration-none"} text-reset ${className}`}
    >
      {children}
    </a>
  )
}

export default Link
