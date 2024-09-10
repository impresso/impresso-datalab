interface LogoImpressoDataLabProps {
  color?: string
  accentColor?: string
  width?: number
}
const LogoImpressoDataLab = ({
  color = "var(--impresso-color-black)",
  accentColor = "var(--impresso-color-yellow)",
  width = 165.04,
}) => {
  const ratio = 165.04 / 56.32
  const height = width / ratio

  return (
    <div className="LogoImpressoDataLab" style={{ height, width }}>
      <svg
        data-name="Impresso Data Lab Logo"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 165.04 56.32"
      >
        <path d="M0 7.81v5.91h51.05V7.81H0Z" fill={accentColor} />
        <path
          fill={color}
          d="M60.05 9.28h26.14v2.95H60.05zM11.34 18.57h77.78v2.95H11.34zM0 0h40.15v2.95H0zM47.84 0h103.34v2.95H47.84zM154.71 0h10.33v2.95h-10.33zM63.44 53.37h101.6v2.95H63.44zM0 53.37h45.42v2.95H0z"
        />
        <g fill={color}>
          <path d="M92.58 14.93c0-2.89 1.73-4.89 4.49-4.89 1.13 0 2.2.46 2.73 1.13V5.71h2.8v13.72h-2.64l-.15-1.16c-.49.84-1.62 1.4-2.93 1.4-2.62 0-4.31-1.86-4.31-4.73Zm7.2-.11c0-1.36-.91-2.27-2.22-2.27s-2.17.93-2.17 2.27.84 2.27 2.17 2.27 2.22-.91 2.22-2.27ZM104.79 16.75c0-1.67 1.18-2.71 3.37-2.87l2.55-.2v-.15c0-.89-.55-1.36-1.55-1.36-1.18 0-1.82.45-1.82 1.27h-2.33c0-2.06 1.69-3.4 4.29-3.4s4.13 1.47 4.13 4.08v5.31h-2.47l-.18-1.2c-.29.84-1.49 1.44-2.86 1.44-1.93 0-3.13-1.13-3.13-2.91Zm5.93-.72v-.49l-1.42.13c-1.22.11-1.65.38-1.65.96 0 .66.4.96 1.26.96 1.07 0 1.82-.53 1.82-1.56ZM116.67 19.43v-6.77h-1.73v-2.33h1.73V7.51h2.8v2.82h1.73v2.33h-1.73v6.77h-2.8ZM122.52 16.75c0-1.67 1.18-2.71 3.37-2.87l2.55-.2v-.15c0-.89-.55-1.36-1.55-1.36-1.18 0-1.82.45-1.82 1.27h-2.33c0-2.06 1.69-3.4 4.29-3.4s4.13 1.47 4.13 4.08v5.31h-2.47l-.18-1.2c-.29.84-1.49 1.44-2.86 1.44-1.93 0-3.13-1.13-3.13-2.91Zm5.93-.72v-.49l-1.42.13c-1.22.11-1.65.38-1.65.96 0 .66.4.96 1.26.96 1.07 0 1.82-.53 1.82-1.56ZM138.9 19.43V5.71h2.8v13.72h-2.8ZM143.88 16.75c0-1.67 1.18-2.71 3.37-2.87l2.55-.2v-.15c0-.89-.55-1.36-1.55-1.36-1.18 0-1.82.45-1.82 1.27h-2.33c0-2.06 1.69-3.4 4.29-3.4s4.13 1.47 4.13 4.08v5.31h-2.47l-.18-1.2c-.29.84-1.49 1.44-2.86 1.44-1.93 0-3.13-1.13-3.13-2.91Zm5.93-.72v-.49l-1.42.13c-1.22.11-1.66.38-1.66.96 0 .66.4.96 1.26.96 1.07 0 1.82-.53 1.82-1.56ZM154.98 19.43V5.71h2.8v5.68c.55-.82 1.75-1.36 3.06-1.36 2.55 0 4.17 1.98 4.17 4.95s-1.8 4.69-4.38 4.69c-1.27 0-2.36-.56-2.86-1.4l-.15 1.16h-2.64Zm5.04-2.33c1.33 0 2.17-.93 2.17-2.27s-.84-2.27-2.17-2.27-2.22.91-2.22 2.27.91 2.27 2.22 2.27Z" />
        </g>
        <path
          d="M122.79 38.05c-.56-.48-1.2-.9-1.92-1.27s-1.47-.71-2.23-1.03c-.58-.24-1.14-.47-1.68-.7s-1.03-.46-1.45-.72c-.42-.26-.76-.55-1.02-.88-.25-.33-.38-.71-.38-1.17 0-.59.24-1.07.71-1.46.47-.39 1.2-.58 2.17-.58.66 0 1.2.1 1.63.3.43.2.7.41.82.63l.9 2.42h3.12v-4.55c-.3-.05-.65-.13-1.05-.24s-.87-.23-1.4-.36c-.54-.12-1.15-.23-1.84-.33-.69-.1-1.47-.15-2.35-.15-1.24 0-2.34.14-3.31.41-.97.28-1.79.66-2.47 1.13-.68.48-1.19 1.05-1.55 1.72-.36.66-.54 1.38-.54 2.15s.1 1.41.31 2c.21.6.51 1.13.91 1.62.4.48.89.91 1.49 1.29s1.28.74 2.06 1.07c.8.35 1.53.68 2.21.97.68.29 1.26.59 1.74.88.48.29.86.6 1.14.93.27.33.41.7.41 1.12 0 .29-.05.56-.16.83-.1.26-.27.5-.5.7-.23.2-.53.36-.91.47-.38.12-.83.17-1.36.17-.33 0-.67-.03-1.01-.09-.34-.06-.64-.14-.93-.25-.28-.1-.53-.22-.74-.35-.21-.13-.35-.26-.43-.4l-.88-2.57h-3.33v4.52c.32.08.73.2 1.23.36.5.16 1.06.32 1.71.48.64.16 1.35.29 2.13.42.78.12 1.62.18 2.52.18 1.4 0 2.61-.15 3.62-.45 1.02-.3 1.86-.71 2.52-1.23.66-.52 1.16-1.13 1.48-1.82.32-.7.49-1.44.49-2.22 0-.87-.17-1.63-.52-2.28s-.8-1.21-1.36-1.69ZM44.9 35.66c0-1.33-.1-2.48-.3-3.45-.2-.97-.53-1.77-.98-2.4-.45-.63-1.05-1.1-1.79-1.4-.74-.3-1.65-.45-2.72-.45-.65 0-1.3.07-1.95.21-.65.14-1.27.33-1.86.58-.59.24-1.14.53-1.65.84-.51.32-.95.65-1.32.99-.41-.9-1-1.56-1.79-1.99-.79-.43-1.83-.64-3.12-.64a8.2 8.2 0 0 0-1.73.21c-.65.14-1.3.34-1.95.58-.65.24-1.28.53-1.87.86-.6.33-1.09.69-1.48 1.07l.02-.79v-1.23l-.94-.78h-.09l-6.26.81v2.85l2.13.67v12.94l-1.92.32v2.23h9.62v-2.23l-2-.34v-12.4c.21-.19.45-.38.73-.56.28-.18.57-.34.89-.49.32-.15.65-.27 1.01-.36.35-.09.71-.13 1.06-.13.56 0 1.01.08 1.36.25.35.16.63.43.84.78.21.36.35.82.43 1.38s.11 1.25.11 2.05v9.47l-1.84.34v2.23h9.68v-2.23l-2.12-.34v-9.47c0-.6-.02-1.16-.05-1.69-.03-.52-.09-1.02-.17-1.48.21-.15.45-.3.72-.46.27-.16.56-.3.86-.42.3-.12.61-.22.93-.3.32-.08.63-.12.95-.12.57 0 1.03.08 1.4.25.37.16.66.43.88.79s.37.84.46 1.42c.09.59.13 1.29.13 2.12v9.35l-1.61.34v2.23h9.49v-2.23l-2.17-.32v-9.5Zm40.53-7.69a5.4 5.4 0 0 0-1.63.24c-.51.16-.98.38-1.42.64-.44.27-.84.56-1.2.89-.36.33-.67.66-.94 1-.27.34-.48.66-.66.97-.17.31-.3.58-.37.8h-.09l.09-2.74v-1.01L78.19 28h-.09l-5.81.8v2.74l2.1.69v12.96l-2.29.31v2.21h12v-2.2l-4.09-.35V34.47c.35-.29.87-.55 1.57-.78.7-.23 1.51-.34 2.42-.34.64 0 1.16.08 1.58.24s.82.4 1.2.72v-6.06c-.13-.08-.31-.15-.55-.2-.24-.05-.51-.08-.81-.08Zm12.94 0c-1.44 0-2.76.23-3.94.68-1.19.45-2.2 1.11-3.05 1.96-.85.85-1.5 1.89-1.97 3.12-.46 1.23-.69 2.63-.69 4.19 0 1.44.18 2.76.54 3.96.36 1.2.92 2.24 1.69 3.11.77.87 1.75 1.54 2.94 2.03 1.19.48 2.62.72 4.28.72.82 0 1.62-.09 2.41-.28.79-.18 1.52-.42 2.19-.69.68-.28 1.27-.58 1.79-.92.52-.33.92-.65 1.19-.95l-1-2.15c-.27.16-.59.33-.96.5-.38.17-.78.33-1.23.48-.45.15-.91.26-1.4.36-.49.09-.96.14-1.42.14a5.3 5.3 0 0 1-1.99-.36c-.6-.24-1.13-.62-1.58-1.13s-.82-1.16-1.09-1.95c-.28-.79-.45-1.74-.52-2.84h11.2c.09-.42.16-.91.2-1.45s.06-1.18.06-1.91c-.06-2.11-.73-3.73-2.02-4.88s-3.17-1.72-5.63-1.72Zm2.12 6.97v.62h-5.98c.02-1.06.12-1.92.29-2.59s.41-1.19.7-1.57c.29-.38.63-.64 1.01-.78.39-.14.81-.21 1.26-.21.52 0 .96.1 1.31.29.35.19.63.46.85.81s.36.76.45 1.23c.09.48.13 1 .13 1.57v.62Zm-33.36-4.81c-.7-.75-1.51-1.29-2.45-1.64s-1.92-.52-2.97-.52c-.65 0-1.25.07-1.81.22s-1.08.35-1.54.59c-.47.24-.88.52-1.25.82-.36.3-.67.6-.93.9v-1.74l-.94-.72h-.09l-6.16.75v2.78l2.12.65v21.36l-2.24.45v2.29h10.87v-2.29l-3.09-.46v-3.13l-.1-3.02c.27.08.62.16 1.06.23.44.07.87.1 1.28.1 1.71 0 3.22-.28 4.53-.85s2.4-1.33 3.29-2.29c.88-.96 1.55-2.07 2.01-3.33.46-1.26.68-2.58.68-3.97 0-1.66-.2-3.08-.61-4.27-.41-1.18-.97-2.15-1.66-2.9Zm-4.06 11.26c-.24.96-.56 1.74-.96 2.34-.4.59-.87 1.02-1.41 1.28-.53.26-1.09.39-1.68.39s-1.06-.08-1.49-.24-.72-.33-.87-.53V32.45c.14-.17.31-.33.51-.5.2-.17.43-.31.68-.44.25-.13.52-.23.81-.32.3-.08.6-.12.91-.12.57 0 1.08.13 1.56.39.47.26.88.66 1.23 1.2.35.54.62 1.24.81 2.1s.28 1.88.27 3.08c-.01 1.41-.14 2.59-.37 3.56ZM7.99 28.36l-1.08-.76h-.09l-6.83.87v2.65l2.34.71v13.32l-2.32.35v2.32h10.2V45.5l-2.22-.33v-16.8ZM5.1 23.41c1.98 0 3.58-1.6 3.58-3.58s-1.6-3.58-3.58-3.58-3.58 1.6-3.58 3.58 1.6 3.58 3.58 3.58Zm159.3 10.23c-.43-1.21-1.04-2.23-1.85-3.07-.81-.84-1.79-1.49-2.96-1.93s-2.5-.67-3.99-.67c-1.31 0-2.56.21-3.75.62-1.2.41-2.26 1.04-3.17 1.87-.92.83-1.65 1.87-2.19 3.13-.54 1.26-.82 2.72-.82 4.39 0 1.52.21 2.88.64 4.08.43 1.21 1.04 2.23 1.85 3.07.8.84 1.79 1.49 2.96 1.93s2.5.67 3.99.67c1.31 0 2.56-.2 3.76-.6 1.2-.4 2.26-1.01 3.17-1.83s1.64-1.86 2.19-3.11c.54-1.26.81-2.75.81-4.47 0-1.52-.21-2.88-.64-4.08Zm-6.34 9.9c-.57 1.15-1.45 1.72-2.64 1.72-.65 0-1.2-.17-1.66-.51-.46-.34-.84-.83-1.14-1.48s-.51-1.45-.65-2.41-.21-2.05-.21-3.3c0-2.45.29-4.25.88-5.4.59-1.15 1.49-1.72 2.69-1.72.66 0 1.21.17 1.66.51.45.34.82.83 1.11 1.48s.5 1.45.62 2.41c.13.96.19 2.05.19 3.3 0 2.45-.29 4.25-.86 5.4Zm-16.54-5.49c-.56-.48-1.2-.9-1.92-1.27s-1.47-.71-2.23-1.03c-.58-.24-1.14-.47-1.68-.7-.54-.22-1.03-.46-1.45-.72s-.76-.55-1.01-.88c-.25-.33-.38-.71-.38-1.17 0-.59.24-1.07.71-1.46.47-.39 1.2-.58 2.17-.58.66 0 1.2.1 1.63.3.43.2.7.41.81.63l.9 2.42h3.12v-4.55c-.3-.05-.65-.13-1.05-.24s-.87-.23-1.41-.36c-.54-.12-1.15-.23-1.84-.33-.69-.1-1.47-.15-2.35-.15-1.24 0-2.34.14-3.31.41-.97.28-1.79.66-2.47 1.13-.68.48-1.19 1.05-1.55 1.72-.36.66-.54 1.38-.54 2.15s.1 1.41.31 2c.21.6.51 1.13.91 1.62.4.48.9.91 1.49 1.29s1.28.74 2.05 1.07c.8.35 1.54.68 2.21.97s1.26.59 1.74.88c.49.29.87.6 1.14.93.27.33.41.7.41 1.12 0 .29-.05.56-.16.83s-.27.5-.5.7c-.23.2-.54.36-.91.47-.38.12-.83.17-1.36.17a5.746 5.746 0 0 1-1.94-.34c-.28-.1-.53-.22-.74-.35-.21-.13-.35-.26-.43-.4l-.89-2.57h-3.33v4.52c.32.08.73.2 1.23.36.5.16 1.07.32 1.71.48.64.16 1.35.29 2.13.42.78.12 1.62.18 2.52.18 1.4 0 2.61-.15 3.62-.45 1.02-.3 1.86-.71 2.52-1.23.67-.52 1.16-1.13 1.48-1.82s.48-1.44.48-2.22c0-.87-.17-1.63-.52-2.28s-.8-1.21-1.36-1.69Z"
          fill={color}
        />
      </svg>
    </div>
  )
}

export default LogoImpressoDataLab
