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
    huggingfaceSpace: {
      id: "impresso-project/impresso-ner-demo",
      author: "impresso-project",
      lastModified: new Date("2026-01-01T00:00:00.000Z"),
      cardData: {
        title: "Impresso Ner Demo",
        short_description: "Named entity recognition demo for Impresso.",
        emoji: "🌖",
        colorFrom: "yellow",
        colorTo: "blue",
        sdk: "gradio",
        app_file: "app.py",
        pinned: false,
        license: "mit",
      },
      host: "https://huggingface.co",
    },
  },
}
