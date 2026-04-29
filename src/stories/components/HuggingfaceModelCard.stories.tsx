import type { Meta, StoryObj } from "@storybook/react-vite"
import HuggingfaceModelCard from "../../components/HuggingfaceModelCard"

const meta: Meta<typeof HuggingfaceModelCard> = {
  component: HuggingfaceModelCard,
  render: (args) => (
    <div style={{ maxWidth: "420px" }}>
      <HuggingfaceModelCard {...args} />
    </div>
  ),
}

export default meta
type Story = StoryObj<typeof HuggingfaceModelCard>

export const FromFullUrl: Story = {
  args: {
    url: "https://huggingface.co/impresso-project/nel-mgenre-multilingual",
  },
}

export const FromSlug: Story = {
  args: {
    url: "impresso-project/nel-mgenre-multilingual",
  },
}
