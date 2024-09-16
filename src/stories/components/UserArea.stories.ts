import type { Meta, StoryObj } from "@storybook/react"
// import { fn } from "@storybook/test"
import UserArea from "../../components/UserArea"

const meta: Meta<typeof UserArea> = {
  component: UserArea,
}

export default meta
type Story = StoryObj<typeof UserArea>

export const Default: Story = {
  args: {},
}
