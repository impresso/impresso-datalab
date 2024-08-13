import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"
import Token from "../../components/Token"

const meta: Meta<typeof Token> = {
  component: Token,
}

export default meta
type Story = StoryObj<typeof Token>

export const Default: Story = {
  args: {},
}
