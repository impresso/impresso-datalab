import React from "react"
import ReactCodeMirror from "@uiw/react-codemirror"
import { nord } from "@uiw/codemirror-theme-nord"
import { python } from "@codemirror/lang-python"
import { Copy } from "iconoir-react"
import { Button } from "react-bootstrap"
import "./CodeSnippet.css"

const CodeSnippet = ({ codeMirrorRef, value, key }) => {
  const handleCopy = () => {
    if (codeMirrorRef.current) {
      // Access the value directly from the CodeMirror component
      const code = codeMirrorRef.current.state.doc
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
    <div className="code-wrapper" key={key}>
      <ReactCodeMirror
        ref={codeMirrorRef}
        value={value}
        theme={nord}
        extensions={[python()]}
      />
      <button className="copy-code" onClick={handleCopy} aria-label="copy code">
        <Copy strokeWidth={2} />
      </button>
      <Button className="me-2" variant="primary" size="sm">
        {/* <LogoColab width={20} className="me-1" /> */}
        <span>Explain Code</span>
      </Button>
    </div>
  )
}

export default CodeSnippet
