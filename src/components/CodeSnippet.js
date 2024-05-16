import React, { useEffect } from "react"
import { useState, useRef } from "react"
import ReactCodeMirror from "@uiw/react-codemirror"
import { nord } from "@uiw/codemirror-theme-nord"
import { python } from "@codemirror/lang-python"
import { Copy, CheckCircle } from "iconoir-react"
import { Button } from "react-bootstrap"
import "./CodeSnippet.css"

const CodeSnippet = ({ value, key = 0 }) => {
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
      const code = codeMirrorRef.current.state.doc
      // Copy the code to the clipboard
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

  useEffect(() => clearTimeout(t.current), [])

  console.log("info", key)
  return (
    <div className="CodeSnippet" key={key}>
      <ReactCodeMirror
        ref={codeMirrorRef}
        value={value}
        theme={nord}
        extensions={[python()]}
      />
      <button className="copy-code" onClick={handleCopy} aria-label="copy code">
        {isActive ? <CheckCircle strokeWidth={2} /> : <Copy strokeWidth={2} />}
      </button>
      <Button className="me-2" variant="primary" size="sm">
        {/* <LogoColab width={20} className="me-1" /> */}
        <span>Explain Code</span>
      </Button>
    </div>
  )
}

export default CodeSnippet
