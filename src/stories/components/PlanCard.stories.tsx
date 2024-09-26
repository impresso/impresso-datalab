import type { Meta, StoryObj } from "@storybook/react"
// import { fn } from "@storybook/test"
import PlanCard from "../../components/PlanCard"
import type { PlanCardProps } from "../../components/PlanCard"

const meta: Meta<typeof PlanCard> = {
  component: PlanCard,
  render: (args) => (
    <div style={{ maxWidth: "400px" }}>
      <PlanCard {...args} />
    </div>
  ),
}

export default meta
type Story = StoryObj<typeof PlanCard>

export const Default: Story = {
  args: {
    plan: {
      slug: "free",
      title: "Free plan",
      body: "This is a free plan",
      icon: "🆓",
    },
    active: false,
  } as PlanCardProps,
}

export const AuthenticatedUser: Story = {
  name: "POPOPO user",
  args: {
    plan: {
      title: "Academics",
      icon: "basic",
      features: [
        { title: "Feature 1", status: "active" },
        { title: "Feature 2", status: "active" },
        { title: "Feature 3", status: "active" },
      ],
    },
  } as PlanCardProps,
}
