import type { Meta, StoryObj } from "@storybook/react"
// import { fn } from "@storybook/test"
import RegisterForm, {
  InitialDefaultValues,
  type RegisterFormPreview,
  type RegisterFormProps,
} from "../../components/RegisterForm"

const meta: Meta<typeof RegisterForm> = {
  component: RegisterForm,
  render: (args) => (
    <div style={{ maxWidth: "500px" }}>
      <RegisterForm {...args} />
    </div>
  ),
}

export default meta
type Story = StoryObj<typeof RegisterForm>

export const Default: Story = {
  name: "Default",
  args: {
    initialValues: {
      ...InitialDefaultValues,
    } as RegisterFormPreview,
    onSubmit: (payload) => {
      console.info("[RegisterForm] @onSubmit", payload)
    },
  } as RegisterFormProps,
}
