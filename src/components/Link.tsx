interface LinkProps extends React.HTMLProps<HTMLAnchorElement> {
  to: string
  children: React.ReactNode
  className?: string
  underline?: boolean
  disabled?: boolean
}

const Link: React.FC<LinkProps> = ({
  to = "/",
  children,
  className = "",
  underline = false,
  disabled = false,
}) => {
  const href = [import.meta.env.PUBLIC_IMPRESSO_DATALAB_BASE, to]
    .join("/")
    .replace(/\/+/g, "/")

  const combinedClassName = `${underline ? "text-decoration-underline" : "text-decoration-none"} text-reset ${className} ${disabled ? "disabled" : ""}`

  return (
    <a href={href} className={combinedClassName}>
      {children}
    </a>
  )
}

export default Link
