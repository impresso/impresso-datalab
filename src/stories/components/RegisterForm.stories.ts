import type { Meta, StoryObj } from "@storybook/react"
// import { fn } from "@storybook/test"
import RegisterForm from "../../components/RegisterForm"

const meta: Meta<typeof RegisterForm> = {
  component: RegisterForm,
}

export default meta
type Story = StoryObj<typeof RegisterForm>

export const Default: Story = {
  args: {},
}
