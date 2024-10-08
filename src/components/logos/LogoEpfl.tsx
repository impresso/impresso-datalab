interface LogoEpflProps {
  color?: string
  width?: number
  className?: string
}

const LogoEpfl = ({
  color = "var(--impresso-color-black)",
  width = 160,
  className = "",
}: LogoEpflProps) => {
  const ratio = 200 / 58.22
  const height = width / ratio

  return (
    <div className={`LogoEpfl SVG ${className}`} style={{ height, width }}>
      <a
        href="https://www.epfl.ch/en/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="EPFL logo"
        title="EPFL is one of Europe’s most vibrant and cosmopolitan science and technology institutions"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 58.22">
          <path
            data-name="Epfl logo"
            d="M0 23.68h12.5V10.74H42V0H0v23.68Zm0 34.43h42V47.36H12.5V34.42H0V58.1Zm39.47-23.68V23.68H12.5v10.75h26.97ZM94.3 5.37c-1.75-1.75-3.95-3.07-6.25-3.84C85.09.44 81.91 0 78.73.11H52.74v58.11h12.5V34.43h13.38c3.18.11 6.25-.44 9.32-1.43 2.3-.88 4.5-2.19 6.25-3.84a15.2 15.2 0 0 0 3.51-5.48c1.43-4.17 1.43-8.66 0-12.72-.66-2.19-1.86-4.06-3.4-5.59ZM85.53 20.5c-.66.88-1.54 1.54-2.52 1.97-1.1.44-2.3.77-3.62.99-1.43.22-2.85.22-4.28.22h-9.87V10.74h9.98c1.43 0 2.85.11 4.28.22 1.21.11 2.41.44 3.62.99.99.44 1.86 1.1 2.41 1.97.66.99.99 2.08.99 3.29s-.33 2.3-.99 3.29Zm84.97 26.87V0h-12.61v58.11h42.1V47.36h-29.5Zm-63.7-23.69h12.5V10.74h29.61V0H106.8v23.68Zm0 34.43h12.5V34.43h-12.5v23.68Zm39.47-23.68V23.68H119.3v10.75h26.97Z"
            fill={color}
          />
        </svg>
      </a>
    </div>
  )
}

export default LogoEpfl
