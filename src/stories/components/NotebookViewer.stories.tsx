import type { Meta, StoryObj } from "@storybook/react"
// import { fn } from "@storybook/test"
import NotebookViewer from "../../components/NotebookViewer"
import type { NotebookViewerProps } from "../../components/NotebookViewer"

const NotebookViewerPropsRawSample = `
{/* cell:7 cell_type:markdown */}
Run the example below to see how it works.

{/* cell:8 cell_type:code */}

\`\`\`python
# Example
text = "Mon nom est François et j'habite à Paris. (Reuter)"
nlp(text)
\`\`\`
`

const meta: Meta<typeof NotebookViewer> = {
  component: NotebookViewer,
  render: (args) => (
    <div style={{ maxWidth: "400px" }}>
      <NotebookViewer {...args} />
    </div>
  ),
}

export default meta
type Story = StoryObj<typeof NotebookViewer>

export const Default: Story = {
  args: {
    notebook: {
      id: "notebook-1",
      href: "/notebook-1",
      title: "Notebook 1",
      authors: [
        {
          slug: "author-1",
          name: "Author 1",
        },
      ],
      date: new Date(),
    },
    raw: NotebookViewerPropsRawSample,
  } as NotebookViewerProps,
}
