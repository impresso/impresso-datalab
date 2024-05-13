import React from "react"
import { useState } from "react"
import ReactCodeMirror from "@uiw/react-codemirror"
import { nord } from "@uiw/codemirror-theme-nord"
import { python } from "@codemirror/lang-python"
import { Copy, CheckCircle } from "iconoir-react"
import { Button } from "react-bootstrap"
import "./CodeSnippet.css"

const CodeSnippet = ({ codeMirrorRef, value, key = 0 }) => {
  const [icon, setIcon] = useState("original")

  const handleCopy = () => {
    if (codeMirrorRef.current) {
      setIcon("new")

      // Reset the icon after a few seconds
      setTimeout(() => {
        setIcon("original")
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
  console.log("info", key)
  return (
    <div className="code-wrapper" key={key}>
      <ReactCodeMirror
        ref={codeMirrorRef}
        value={value}
        theme={nord}
        extensions={[python()]}
      />
      <button className="copy-code" onClick={handleCopy} aria-label="copy code">
        {icon === "original" ? (
          <Copy strokeWidth={2} />
        ) : (
          <CheckCircle strokeWidth={2} />
        )}
      </button>
      <Button className="me-2" variant="primary" size="sm">
        {/* <LogoColab width={20} className="me-1" /> */}
        <span>Explain Code</span>
      </Button>
    </div>
  )
}

export default CodeSnippet
