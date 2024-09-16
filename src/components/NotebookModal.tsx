import Page from "./Page"
import type { Notebook } from "./NotebookCard"

const NotebookModal: React.FC<{ notebook: Notebook }> = ({ notebook }) => {
  return (
    <Page title={notebook.title}>
      <h2>Notebook</h2>
    </Page>
  )
}

export default NotebookModal
