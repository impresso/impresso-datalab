import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"
import UserCard from "../../components/UserCard"
import type { User } from "../../components/UserCard"

const meta: Meta<typeof UserCard> = {
  component: UserCard,
}

export default meta
type Story = StoryObj<typeof UserCard>

export const Default: Story = {
  args: {
    user: {
      username: "user",
      isStaff: false,
      profile: {
        pattern: ["#000000", "#FFFFFF"],
      },
    } as User,
  },
}
