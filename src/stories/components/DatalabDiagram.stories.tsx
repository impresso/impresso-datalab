import type { Meta, StoryObj } from "@storybook/react"
// import { fn } from "@storybook/test"
import DatalabDiagram from "../../components/DatalabDiagram"
import type { DatalabDiagramProps } from "../../components/DatalabDiagram"

const meta: Meta<typeof DatalabDiagram> = {
  component: DatalabDiagram,
  render: (args) => (
    <div style={{ maxWidth: "400px" }}>
      <DatalabDiagram {...args} />
    </div>
  ),
}

export default meta
type Story = StoryObj<typeof DatalabDiagram>

export const Default: Story = {
  args: {
    debug: false,
  } as DatalabDiagramProps,
}
