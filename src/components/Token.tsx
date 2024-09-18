/**
 * React component for displaying and copying a token.
 *
 * @component
 * @example
 * ```tsx
 * <Token token="exampleToken" />
 * ```
 */
import { useEffect, useRef, useState } from "react"
import { Copy, CheckCircle } from "iconoir-react"
import "./Token.css"

export interface TokenProps {
  token: string
  className?: string
  validity?: number
}

const Token: React.FC<TokenProps> = ({
  token,
  validity = 60 * 60 * 8,
  className = "",
}) => {
  const [isCopied, setIsCopied] = useState(false)
  const timerRef = useRef<any>(null)
  const etaRef = useRef<number>(validity) // eta in seconds
  const etaSpanRef = useRef<HTMLSpanElement>(null)
  const etaTimerRef = useRef<any>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleCopy = () => {
    console.info("[Token] button @click")
    if (textareaRef.current) {
      textareaRef.current.select()
      navigator.clipboard.writeText(token)
      setIsCopied(true)
    }
  }

  const handleTextareaClick = () => {
    console.info("[Token] textarea @click")
    // select all text in the textarea
    if (textareaRef.current) {
      textareaRef.current.select()
    }
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "c" && (event.ctrlKey || event.metaKey)) {
        handleCopy()
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  useEffect(() => {
    // on tocken change, reset the copy state
    setIsCopied(false)

    // set etaRef to 8h
    etaTimerRef.current = setInterval(() => {
      if (etaSpanRef.current) {
        etaRef.current -= 1
        // traznsform seconds in H min and s string
        const hours = Math.floor(etaRef.current / 3600)
        const minutes = Math.floor((etaRef.current % 3600) / 60)
        const seconds = etaRef.current % 60
        etaSpanRef.current.innerText = `${hours}h ${minutes}m ${seconds}s`
      }
    }, 1000)
    return () => {
      clearInterval(etaTimerRef.current)
    }
  }, [token])

  useEffect(() => {
    // reset the copy state after 2 seconds
    timerRef.current = setTimeout(() => {
      setIsCopied(false)
    }, 3500)

    return () => {
      clearTimeout(timerRef.current)
    }
  }, [isCopied])

  return (
    <div className={`Token  ${className}`}>
      <div className="Token__display p-3 d-flex align-items-center position-relative">
        <textarea
          ref={textareaRef}
          value={token}
          readOnly
          onClick={handleTextareaClick}
          className=""
        />
        <div className="ms-2">
          <button onClick={handleCopy} disabled={isCopied}>
            {isCopied ? <CheckCircle /> : <Copy />}
          </button>
        </div>
      </div>
      {isCopied && (
        <div className="mt-3 mx-3 Token__display__helpText ">
          Copied to clipboard
        </div>
      )}
      {token ? (
        <p className="small mt-3 mx-3">
          Please copy your token and keep it in a safe place. This token will be
          valid for the next <span ref={etaSpanRef}>valid for 8h</span>
        </p>
      ) : null}
    </div>
  )
}

export default Token
