import type { Meta, StoryObj } from "@storybook/react"
// import { fn } from "@storybook/test"
import NotebookCard from "../../components/NotebookCard"
import type { Notebook } from "../../components/NotebookCard"

const meta: Meta<typeof NotebookCard> = {
  component: NotebookCard,
  render: (args) => (
    <div style={{ maxWidth: "400px" }}>
      <NotebookCard {...args} />
    </div>
  ),
}

export default meta
type Story = StoryObj<typeof NotebookCard>

export const Default: Story = {
  args: {
    notebook: {
      slug: "notebook-1",
      href: "/notebook-1",
      title: "Notebook 1",
      authors: [
        {
          name: "Author 1",
        },
      ],
      date: new Date(),
    } as Notebook,
  },
}
