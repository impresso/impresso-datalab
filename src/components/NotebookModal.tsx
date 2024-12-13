import Page from "./Page"
import NotebookViewer from "./NotebookViewer"
import type { Notebook } from "../types"

interface NotebookModalProps {
  notebook: Notebook
  raw?: string
}

const NotebookModal: React.FC<NotebookModalProps> = ({
  notebook,
  raw = "",
}) => {
  return (
    <Page title="Notebook" fullscreen="xl-down" size="xl">
      <NotebookViewer notebook={notebook} raw={raw} />
      {/* <pre>{JSON.stringify(notebook, null, 2)}</pre> */}
    </Page>
  )
}

export default NotebookModal
