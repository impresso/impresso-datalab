interface LinkProps extends React.HTMLProps<HTMLAnchorElement> {
  to: string
  children: React.ReactNode
  className?: string
  underline?: boolean
  disabled?: boolean
  target?: "_self" | "_blank" | "_parent" | "_top"
}

const Link: React.FC<LinkProps> = ({
  to = "/",
  children,
  className = "",
  underline = false,
  disabled = false,
  target = "_self",
}) => {
  const href = [import.meta.env.PUBLIC_IMPRESSO_DATALAB_BASE, to]
    .join("/")
    .replace(/\/+/g, "/")

  const combinedClassName = `${underline ? "text-decoration-underline" : "text-decoration-none"} text-reset ${className} ${disabled ? "disabled" : ""}`

  return (
    <a href={href} className={combinedClassName} target={target}>
      {children}
    </a>
  )
}

export default Link
