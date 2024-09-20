import { useState, useRef, useEffect } from "react"
import ReactCodeMirror, { EditorView } from "@uiw/react-codemirror"
import type { ReactCodeMirrorRef } from "@uiw/react-codemirror"
import { nord } from "@uiw/codemirror-theme-nord"
import { duotoneDark } from "@uiw/codemirror-theme-duotone"
import { python } from "@codemirror/lang-python"
import { Copy, CheckCircle } from "iconoir-react"

import "./CodeSnippet.css"

export interface CodeSnippetProps {
  value?: string
  readonly?: boolean
  theme?: "nord" | "duotoneDark"
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({
  value = "",
  readonly = false,
  theme = "nord",
}) => {
  const timerRef = useRef<ReturnType<typeof setTimeout>>()
  const codeMirrorRef = useRef<ReactCodeMirrorRef>(null)
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = () => {
    if (codeMirrorRef.current) {
      setIsCopied(true)
      // Access the value directly from the CodeMirror component
      const code = String(codeMirrorRef.current.state?.doc ?? "")
      // Copy the code to the clipboard
      navigator.clipboard
        .writeText(code)
        .then(() => {
          console.log("Code copied to clipboard")
        })
        .catch((error) => {
          console.error("Failed to copy code: ", error)
          setIsCopied(false)
        })
    }
  }

  useEffect(() => {
    clearTimeout(timerRef.current)
    // reset the copy state after 2 seconds
    timerRef.current = setTimeout(() => {
      setIsCopied(false)
    }, 3500)

    return () => {
      clearTimeout(timerRef.current)
    }
  }, [isCopied])

  return (
    <div className="CodeSnippet">
      <ReactCodeMirror
        ref={codeMirrorRef}
        value={value}
        theme={theme === "nord" ? nord : duotoneDark}
        readOnly={readonly}
        extensions={[python(), EditorView.lineWrapping]}
      />
      <button className="copy-code" onClick={handleCopy} aria-label="copy code">
        {isCopied ? <CheckCircle strokeWidth={2} /> : <Copy strokeWidth={2} />}
      </button>
    </div>
  )
}

export default CodeSnippet
