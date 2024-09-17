import type { Meta, StoryObj } from "@storybook/react"
// import { fn } from "@storybook/test"
import Token from "../../components/Token"
import type { TokenProps } from "../../components/Token"

const meta: Meta<typeof Token> = {
  component: Token,
  render: (args) => (
    <div style={{ maxWidth: "400px" }}>
      <Token {...args} />
    </div>
  ),
}

export default meta
type Story = StoryObj<typeof Token>

export const Default: Story = {
  args: {
    token: 'Abscsdkaoeiru(aoiçoai&raoroai??roa3"KcIEcUec',
  } as TokenProps,
}
