import { useState, useRef, useEffect } from "react"
import ReactCodeMirror, { EditorView } from "@uiw/react-codemirror"
import type { ReactCodeMirrorRef } from "@uiw/react-codemirror"
import { python } from "@codemirror/lang-python"
import { Copy, CheckCircle } from "iconoir-react"
import { createTheme } from "@uiw/codemirror-themes"
import { tags as t } from "@lezer/highlight"

import "./CodeSnippet.css"

export interface CodeSnippetProps {
  value?: string
  readonly?: boolean
  basicSetup?: any
}

const myTheme = createTheme({
  theme: "light",
  settings: {
    background: "#fff9f250",
    backgroundImage: "",
    foreground: "#75baff",
    caret: "#5d00ff",
    selection: "#036dd626",
    selectionMatch: "#036dd626",
    lineHighlight: "#8a91991a",
    gutterBorder: "1px solid #ffffff10",
    gutterBackground: "#fff9f2",
    gutterForeground: "#8a919966",
  },
  styles: [
    { tag: t.comment, color: "#6c9d7c" },
    { tag: t.variableName, color: "#9c48bd" },
    { tag: [t.string, t.special(t.brace)], color: "#5c6166" },
    { tag: t.number, color: "#5c6166" },
    { tag: t.bool, color: "#5c6166" },
    { tag: t.null, color: "#5c6166" },
    { tag: t.keyword, color: "#5c6166" },
    { tag: t.operator, color: "#5c6166" },
    { tag: t.className, color: "#5c6166" },
    { tag: t.definition(t.typeName), color: "#5c6166" },
    { tag: t.typeName, color: "#5c6166" },
    { tag: t.angleBracket, color: "#5c6166" },
    { tag: t.tagName, color: "#5c6166" },
    { tag: t.attributeName, color: "#5c6166" },
  ],
})

const CodeSnippet: React.FC<CodeSnippetProps> = ({
  value = "",
  readonly = false,
  basicSetup = {
    lineNumbers: true,
    tabSize: 2,
    foldGutter: true,
  },
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
        // theme={duotoneDark}
        theme={myTheme}
        readOnly={readonly}
        basicSetup={basicSetup}
        extensions={[python(), EditorView.lineWrapping]}
      />
      <button className="copy-code" onClick={handleCopy} aria-label="copy code">
        {isCopied ? (
          <CheckCircle strokeWidth={1.5} />
        ) : (
          <Copy strokeWidth={1.5} />
        )}
      </button>
    </div>
  )
}

export default CodeSnippet
