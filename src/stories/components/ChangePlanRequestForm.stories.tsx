import type { Meta, StoryObj } from "@storybook/react"
// import { fn } from "@storybook/test"
import ChangePlanRequestForm from "../../components/ChangePlanRequestForm"
import { AvailablePlans } from "../../constants"

const meta: Meta<typeof ChangePlanRequestForm> = {
  component: ChangePlanRequestForm,
  argTypes: {
    plan: {
      options: AvailablePlans,
      control: { type: "select" },
    },
  },
  render: (args) => {
    return (
      <div style={{ maxWidth: "400px" }}>
        <ChangePlanRequestForm
          plan={args.plan}
          onSubmit={(payload) =>
            console.info("[ChangePlanRequestForm] @onSubmit", payload)
          }
        />
      </div>
    )
  },
}

export default meta
type Story = StoryObj<typeof ChangePlanRequestForm>

export const Default: Story = {
  args: {},
}
