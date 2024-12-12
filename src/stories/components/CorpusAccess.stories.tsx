import type { Meta, StoryObj } from "@storybook/react"
import CorpusAccess, {
  type CorpusAccessProps,
} from "../../components/CorpusAccess"
// import { fn } from "@storybook/test"

const meta: Meta<typeof CorpusAccess> = {
  component: CorpusAccess,
  render: (args) => (
    <div style={{ maxWidth: "500px" }}>
      <CorpusAccess {...args} />
    </div>
  ),
}

export default meta
type Story = StoryObj<typeof CorpusAccess>

export const Default: Story = {
  name: "Default",
  args: {} as CorpusAccessProps,
}
