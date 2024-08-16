import type { Meta, StoryObj } from "@storybook/react"
import Token from "../../components/Token"

const meta: Meta<typeof Token> = {
  component: Token,
}

export default meta
type Story = StoryObj<typeof Token>

export const Default: Story = {
  args: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJ1c2VySWQiOiJsb2NhbC1kZyIsInVzZXJHcm91cHMiOlsiTkRBIiwicGxhbi1yZXNlYXJjaGVyIl0sImlzU3RhZmYiOnRydWUsImlhdCI6MTcyMzgwMTc1MiwiZXhwIjoxNzI0NDA2NTUyLCJhdWQiOiJodHRwczovL2Rldi5pbXByZXNzby1wcm9qZWN0LmNoL2FwcCIsImlzcyI6ImltcHJlc3NvLXYxIiwic3ViIjoiMSIsImp0aSI6ImVkZDRhZDcxLTUyYjYtNDY2My04Mjk1LTgwOTkwMGY4ZTUyZiJ9.oswrQskk7S6kwHyLjag1Qnr48zM5yXzUwEWJKv8MSM8",
  },
}
