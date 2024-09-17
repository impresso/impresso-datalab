import type { Notebook } from "./NotebookCard"

export interface NotebookViewerProps {
  notebook: Notebook
  raw?: string
}

const splitTextWithCellInfo = (
  text: string,
): Array<{ cellNumber: number; cellType: string; content: string }> => {
  const cells: Array<{
    cellNumber: number
    cellType: string
    content: string
    idx: number
    l: number
  }> = []
  const regex = /\{\/*\*\s*cell:(\d+)\s*cell_type:(\w+)\s*\*\/\}/g
  let match

  while ((match = regex.exec(text)) !== null) {
    cells.push({
      idx: match.index,
      l: match[0].length,
      cellNumber: parseInt(match[1]),
      cellType: match[2],
      content: "",
    })
  }
  // now based on the indexes we can extract the content
  for (let i = 0; i < cells.length; i++) {
    const start = cells[i].idx + cells[i].l
    const end = cells[i + 1]?.idx
    cells[i].content = text.slice(start, end).trim()
  }

  return cells
}

const NotebookViewer: React.FC<NotebookViewerProps> = ({
  notebook,
  raw = "",
}) => {
  // split the raw parameter
  // according to {/* cell:7 cell_type:markdown */}
  const cells = splitTextWithCellInfo(raw)
  return (
    <div>
      <h1>Notebook Viewer</h1>
      <pre>{JSON.stringify(notebook, null, 2)}</pre>
      <pre>{JSON.stringify(cells, null, 2)}</pre>
    </div>
  )
}

export default NotebookViewer
