import type { Meta, StoryObj } from "@storybook/react-vite"
import HuggingfaceSpaceCard from "../../components/HuggingfaceSpaceCard"

const meta: Meta<typeof HuggingfaceSpaceCard> = {
  component: HuggingfaceSpaceCard,
  render: (args) => (
    <div style={{ maxWidth: "420px" }}>
      <HuggingfaceSpaceCard {...args} />
    </div>
  ),
}

export default meta
type Story = StoryObj<typeof HuggingfaceSpaceCard>

export const Default: Story = {
  args: {
    url: "https://huggingface.co/spaces/impresso-project/impresso-ner-demo",
  },
}
