import type { Meta, StoryObj } from "@storybook/react"
// import { fn } from "@storybook/test"
import type { DatasetCardProps } from "../../components/DatasetCard"
import DatasetCard from "../../components/DatasetCard"
import type { Dataset } from "../../types"

const meta: Meta<typeof DatasetCard> = {
  component: DatasetCard,
  render: (args) => (
    <div style={{ maxWidth: "400px" }}>
      <DatasetCard {...args} />
    </div>
  ),
}

export default meta
type Story = StoryObj<typeof DatasetCard>

export const Default: Story = {
  args: {
    dataset: {
      id: "123",
    } as Dataset,
  } as DatasetCardProps,
}
