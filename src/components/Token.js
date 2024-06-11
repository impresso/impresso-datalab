import React from "react"
import { useRef, useState } from "react"
import { Copy, CheckCircle } from "iconoir-react"
import "./Token.css"

const Token = ({ className = "" }) => {
  const t = useRef()
  const codeMirrorRef = useRef(null)
  const [isActive, setIsActive] = useState(false)

  const handleCopy = () => {
    if (codeMirrorRef.current) {
      clearTimeout(t.current)
      setIsActive(true)

      // Reset the icon after a few seconds
      t.current = setTimeout(() => {
        setIsActive(false)
      }, 2000) // 2000 milliseconds = 2 seconds
      // Access the value directly from the CodeMirror component
      const code = codeMirrorRef.current.textContent
      // Copy the code to the clipboard
      console.log("code", code)
      navigator.clipboard
        .writeText(code)
        .then(() => {
          console.log("Code copied to clipboard")
        })
        .catch((error) => {
          console.error("Failed to copy code: ", error)
        })
    }
  }

  return (
    <div className={`Token ${className}`}>
      <span>Your token (valid for 7h 55m)</span>
      <div className="token-field">
        <p ref={codeMirrorRef}>AZZD67t8huhgfhjhu7guhg5yuiuo9popoi09uhug</p>
        <button
          className="copy-code"
          onClick={handleCopy}
          aria-label="copy token"
        >
          {isActive ? (
            <CheckCircle strokeWidth={2} />
          ) : (
            <Copy strokeWidth={2} />
          )}
        </button>
      </div>
    </div>
  )
}

export default Token
