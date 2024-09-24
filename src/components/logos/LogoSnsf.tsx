interface LogoSnsfProps {
  color?: string
  width?: number
  className?: string
}

const LogoSnsf = ({
  color = "var(--impresso-color-black)",
  width = 160,
  className = "",
}: LogoSnsfProps) => {
  const ratio = 199.99 / 44.94
  const height = width / ratio

  return (
    <div
      className={`LogoSnsf SVG ${className}`}
      style={{ height: height + "px", width: width + "px" }}
    >
      <a
        href="https://www.snf.ch/en"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="SNSF Logo"
        alt="The Swiss National Science Foundation (SNSF)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 199.99 44.94">
          <path
            data-name="SNSF-logo"
            d="M72.34 19.01h-2.56v8.29h2.56v-8.29Zm-6.6 25.72h2.56v-8.29h-2.56v8.29Zm8.46-8.51c-2.48 0-4.25 1.73-4.25 4.32 0 2.79 1.86 4.39 4.3 4.39 2.29 0 3.48-1.27 3.97-1.97l-1.76-1.19c-.28.49-.94 1.15-2.06 1.15-1.25 0-1.92-.78-2-1.69h5.91c.02-.16.02-.35.02-.52 0-2.53-1.4-4.5-4.13-4.5Zm-1.79 3.39c.04-.87.79-1.62 1.78-1.62s1.64.66 1.69 1.62h-3.47Zm1.79-3.39Zm-8.69-13.7c-.23 1.2-.33 1.78-.51 2.61h-.02c-.19-.85-.3-1.46-.57-2.56L63.52 19H60.8l-.87 3.54c-.24 1.01-.4 1.78-.59 2.6h-.02c-.17-.85-.32-1.69-.47-2.54l-.66-3.59h-2.61l2.09 8.29h3.17l.7-3.17c.21-.9.38-2.02.57-2.86h.02c.17.89.38 1.99.56 2.82l.68 3.19h3.14l2.2-8.3H66.2l-.68 3.52Zm.23 12.85h2.56v-2.49h-2.56v2.49Zm-5.11 2.77c.89 0 1.46.5 1.71 1.41l2.2-.75c-.42-1.34-1.6-2.58-3.9-2.58-2.61 0-4.39 1.59-4.39 4.39s1.78 4.32 4.39 4.32c2.2 0 3.36-1.1 3.82-2.26l-2.16-.89c-.27.79-.84 1.22-1.66 1.22-1.17 0-1.82-.89-1.82-2.42s.63-2.44 1.82-2.44Zm38.12-14.73c0-1.9-.12-3.87-.12-3.87h.02s1.14 2.09 1.8 3.19l2.81 4.57h2.65V15.45h-2.6v3.96c0 1.37.1 3.71.1 3.71h-.02s-.8-1.48-1.74-3.03l-2.84-4.64h-2.67v11.84h2.61v-3.88Zm-12.32 2.22c-1.15 0-2.14-.58-2.65-1.27l-1.6 1.29c.75 1.03 2.35 1.86 4.25 1.86s3.66-.92 3.66-2.86c0-1.58-1.22-2.12-2.56-2.4l-1.31-.28c-.85-.17-1.23-.3-1.23-.73s.51-.61 1.08-.61c.82 0 1.64.35 2.25.91l1.42-1.36c-.84-.8-2.08-1.38-3.62-1.38-1.64 0-3.54.72-3.54 2.69 0 .7.26 1.24.71 1.62.51.43 1.22.71 2.06.87l1.31.26c.56.1 1.07.19 1.07.66s-.44.73-1.29.73Zm39.81-6.62h-2.56v8.29h2.56v-8.29Zm6.05 8.5c2.61 0 4.41-1.51 4.41-4.32s-1.8-4.39-4.41-4.39-4.39 1.59-4.39 4.39 1.78 4.32 4.39 4.32Zm0-6.79c1.18 0 1.83.89 1.83 2.44s-.66 2.42-1.83 2.42-1.81-.89-1.81-2.42.63-2.44 1.81-2.44Zm-6.05-5.27h-2.56v2.49h2.56v-2.49Zm-53.9 0h-2.56v2.49h2.56v-2.49ZM51.66 37.72l-1.92-.38c-1.08-.21-1.62-.52-1.62-1.29s.77-1.2 1.86-1.2c1.19 0 2.25.5 3.07 1.29l1.67-1.6c-1.01-1.08-2.68-1.86-4.77-1.86-2.6 0-4.57 1.48-4.57 3.61 0 2.32 1.64 3.1 3.8 3.52l1.53.3c1.08.19 1.78.42 1.78 1.24 0 .87-.8 1.41-2.18 1.41-1.63 0-2.86-.87-3.59-1.85l-1.83 1.57c.73 1.01 2.61 2.48 5.35 2.48s4.98-1.36 4.98-3.82c0-2.09-1.37-2.96-3.57-3.4Zm-6.72-34.2a3.492 3.492 0 0 0-6.96-.41H25.95A3.487 3.487 0 0 0 22.09.03c-1.78.2-3.12 1.71-3.1 3.5 0 1.77 1.32 3.26 3.07 3.47v12.03c-.62.07-1.2.31-1.7.69-.07.05-.14.12-.22.17l-.13.13c-.55.55-.91 1.28-1 2.05H6.99a3.494 3.494 0 0 0-3.88-3.05 3.498 3.498 0 0 0-3.05 3.89c.19 1.6 1.45 2.86 3.05 3.05v12.03c-1.92.22-3.3 1.94-3.08 3.86.2 1.78 1.71 3.12 3.5 3.1a3.48 3.48 0 0 0 3.52-3.46c.02-1.79-1.32-3.3-3.1-3.5V25.96c1.6-.19 2.85-1.45 3.05-3.04h12.03c.21 1.75 1.7 3.07 3.47 3.07h.03c.11 0 .22 0 .33-.02.73-.07 1.42-.38 1.97-.87l.02-.02.06-.05.06-.06c0-.01.01-.02.02-.02.03-.03.06-.06.09-.1 0 0 0-.01.02-.02a3.492 3.492 0 0 0-2.19-5.8V6.99c1.6-.19 2.86-1.45 3.05-3.05h12.03c.21 1.75 1.7 3.07 3.47 3.07 1.93 0 3.49-1.56 3.49-3.49Zm30.31 20.83-1.6 1.29c.75 1.03 2.35 1.86 4.25 1.86s3.66-.92 3.66-2.86c0-1.58-1.22-2.12-2.56-2.4l-1.31-.28c-.85-.17-1.24-.3-1.24-.73s.51-.61 1.08-.61c.82 0 1.64.35 2.25.91l1.42-1.36c-.84-.8-2.08-1.38-3.62-1.38-1.64 0-3.54.72-3.54 2.69 0 .7.26 1.24.72 1.62.51.43 1.22.71 2.06.87l1.31.26c.56.1 1.06.19 1.06.66s-.44.73-1.29.73c-1.15 0-2.14-.58-2.65-1.27ZM51.66 20.3l-1.92-.38c-1.08-.21-1.62-.52-1.62-1.29s.77-1.2 1.86-1.2c1.19 0 2.25.5 3.07 1.29l1.67-1.6c-1.01-1.08-2.68-1.86-4.77-1.86-2.6 0-4.57 1.48-4.57 3.61 0 2.32 1.64 3.1 3.8 3.52l1.53.3c1.08.19 1.78.42 1.78 1.23 0 .87-.8 1.41-2.18 1.41-1.63 0-2.86-.87-3.59-1.85l-1.83 1.57c.73 1.01 2.61 2.47 5.35 2.47s4.98-1.36 4.98-3.82c0-2.09-1.37-2.96-3.57-3.4Zm73.69 15.92c-2.61 0-4.39 1.59-4.39 4.39s1.78 4.32 4.39 4.32 4.41-1.51 4.41-4.32-1.8-4.39-4.41-4.39Zm0 6.78c-1.17 0-1.82-.89-1.82-2.42s.63-2.44 1.82-2.44 1.83.89 1.83 2.44-.66 2.42-1.83 2.42Zm48.74-9.9-2.54.51v2.83h-1.6v1.72h1.6v4.32c0 .84.04 1.29.35 1.71.43.57 1.48.71 2.47.71.51 0 1.03-.05 1.53-.14v-1.85c-.13.02-.35.04-.65.04-.47 0-.78-.07-.96-.26-.16-.16-.21-.38-.21-.85v-3.68h1.82v-1.73h-1.82V33.1Zm-5.18 9.56v-3.85c0-1.88-1.35-2.54-3.47-2.54-2.34 0-3.87 1.03-3.84 2.93l2.35.02c0-.84.49-1.2 1.38-1.2s1.22.35 1.22.97v.14c0 .26-.07.31-.52.38l-1.73.28c-1.76.28-2.96.91-2.96 2.49 0 1.72 1.17 2.67 3 2.67 1.34 0 1.95-.35 2.34-.77h.02c.17.61.85.75 1.59.75.4 0 .79-.03 1.18-.1v-1.46h-.12c-.36 0-.44-.17-.44-.7Zm-2.36-.63c0 .87-.59 1.25-1.43 1.25-.73 0-1.23-.3-1.23-.97 0-.71.61-.85 1.43-1.01.89-.18 1.04-.26 1.23-.33v1.06Zm-8.94-14.73h2.54V15.45h-2.54V27.3Zm-.44 9.88c-.42-.5-1.22-.96-2.42-.96-2.32 0-3.87 1.83-3.87 4.36s1.49 4.36 3.85 4.36c1.15 0 2.04-.52 2.44-.97v.77h2.54V32.89h-2.54v4.3Zm-1.83 5.84c-1.24 0-1.88-.92-1.88-2.44s.7-2.42 1.88-2.42 1.9.98 1.9 2.42-.77 2.44-1.9 2.44Zm22.06-7.65h2.56v-2.49h-2.56v2.49Zm-92.44.86c-1.19 0-2.09.56-2.49 1.24v-1.03h-2.51v8.29h2.54v-4.37c0-1.13.45-1.97 1.52-1.97 1.25 0 1.31.89 1.31 2.16v4.18h2.55v-4.7c0-1.83-.21-2.4-.73-3-.49-.54-1.22-.8-2.18-.8Zm92.44 8.5h2.56v-8.29h-2.56v8.29Zm8.61-8.51c-2.61 0-4.39 1.59-4.39 4.39s1.78 4.32 4.39 4.32 4.41-1.51 4.41-4.32-1.8-4.39-4.41-4.39Zm0 6.78c-1.17 0-1.81-.89-1.81-2.42s.63-2.44 1.81-2.44 1.83.89 1.83 2.44-.66 2.42-1.83 2.42Zm-32.85-16.26h.02c.17.61.85.75 1.59.75.4 0 .79-.03 1.18-.1v-1.46h-.12c-.36 0-.44-.17-.44-.7v-3.85c0-1.88-1.34-2.54-3.47-2.54-2.34 0-3.87 1.03-3.84 2.93l2.35.02c0-.84.49-1.2 1.38-1.2s1.22.35 1.22.97v.14c0 .26-.07.31-.52.38l-1.72.28c-1.76.28-2.96.91-2.96 2.49 0 1.73 1.17 2.67 3 2.67 1.34 0 1.95-.35 2.34-.77Zm-.14-2.14c0 .87-.59 1.25-1.43 1.25-.73 0-1.23-.3-1.23-.98 0-.71.61-.85 1.43-1.01.89-.17 1.04-.26 1.23-.33v1.07Zm46.24 12.43c-.49-.54-1.22-.8-2.18-.8-1.19 0-2.09.56-2.49 1.24v-1.03h-2.51v8.29h2.54v-4.37c0-1.13.45-1.97 1.52-1.97 1.25 0 1.31.89 1.31 2.16v4.18H200v-4.7c0-1.83-.21-2.4-.73-3Zm-96.64-.81c-2.47 0-4.25 1.72-4.25 4.32 0 2.79 1.86 4.39 4.3 4.39 2.29 0 3.48-1.27 3.97-1.97l-1.76-1.19a2.32 2.32 0 0 1-2.06 1.15c-1.25 0-1.92-.78-2-1.69h5.91c.02-.16.02-.35.02-.52 0-2.53-1.4-4.5-4.13-4.5Zm-1.79 3.39c.03-.87.78-1.62 1.78-1.62s1.64.66 1.69 1.62h-3.47Zm11.99 5.12h2.63v-4.85h4.83v-2.35h-4.83V35.2h5.05v-2.32h-7.68v11.85Zm.14-17.99h.02c.17.61.85.75 1.59.75.42 0 .8-.03 1.18-.1v-1.46h-.12c-.36 0-.44-.17-.44-.7v-3.85c0-1.88-1.34-2.54-3.47-2.54-2.34 0-3.87 1.03-3.84 2.93l2.35.02c0-.84.49-1.2 1.38-1.2s1.22.35 1.22.97v.14c0 .26-.07.31-.52.38l-1.72.28c-1.76.28-2.96.91-2.96 2.49 0 1.73 1.17 2.67 3 2.67 1.34 0 1.95-.35 2.34-.77Zm-.14-2.14c0 .87-.59 1.25-1.43 1.25-.73 0-1.23-.3-1.23-.98 0-.71.61-.85 1.43-1.01.89-.17 1.04-.26 1.24-.33v1.07ZM93.84 38.14c.89 0 1.47.5 1.71 1.41l2.2-.75c-.42-1.34-1.6-2.58-3.9-2.58-2.61 0-4.39 1.59-4.39 4.39s1.78 4.32 4.39 4.32c2.2 0 3.36-1.1 3.82-2.26l-2.16-.89c-.27.79-.84 1.22-1.66 1.22-1.17 0-1.81-.89-1.81-2.42s.63-2.44 1.81-2.44Zm48.57-17.18c1.25 0 1.31.89 1.31 2.16v4.18h2.55v-4.7c0-1.83-.21-2.4-.73-3-.49-.54-1.22-.8-2.18-.8-1.19 0-2.09.56-2.49 1.24v-1.03h-2.51v8.29h2.54v-4.38c0-1.13.45-1.97 1.52-1.97Zm3.98 15.27c-1.19 0-2.09.56-2.49 1.24v-1.03h-2.51v8.29h2.54v-4.37c0-1.13.45-1.97 1.52-1.97 1.25 0 1.31.89 1.31 2.16v4.18h2.55v-4.7c0-1.83-.21-2.4-.73-3-.49-.54-1.22-.8-2.18-.8Zm-24.21-10.74c-.21.03-.43.04-.65.04-.47 0-.78-.07-.96-.26-.16-.16-.21-.38-.21-.85v-3.68h1.82v-1.73h-1.82v-3.33l-2.54.51v2.83h-1.6v1.73h1.6v4.32c0 .84.04 1.29.35 1.71.43.58 1.48.71 2.47.71.51 0 1.03-.05 1.53-.14V25.5Zm14.43 15.32c0 1.13-.45 1.97-1.48 1.97-1.25 0-1.27-.89-1.27-2.16v-4.18h-2.55v4.71c0 1.83.21 2.4.73 3 .49.54 1.19.8 2.14.8 1.17 0 2.06-.56 2.46-1.24v1.03h2.51v-8.3h-2.54v4.38Z"
            fill={color}
          />
        </svg>
      </a>
    </div>
  )
}

export default LogoSnsf
