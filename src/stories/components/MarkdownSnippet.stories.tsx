import type { Meta, StoryObj } from "@storybook/react"
// import { fn } from "@storybook/test"
import MarkdownSnippet from "../../components/MarkdownSnippet"
import type { MarkdownSnippetProps } from "../../components/MarkdownSnippet"

const MarkdownSnippetPropsValueSample = `
# Example
text = "Mon nom est François et j'habite à Paris. (Reuter)"
nlp(text)
`

const meta: Meta<typeof MarkdownSnippet> = {
  component: MarkdownSnippet,
  render: (args) => (
    <div style={{ maxWidth: "400px" }}>
      <MarkdownSnippet {...args} />
    </div>
  ),
}

export default meta
type Story = StoryObj<typeof MarkdownSnippet>

export const Default: Story = {
  args: {
    value: MarkdownSnippetPropsValueSample.trim(),
    readonly: true,
  } as MarkdownSnippetProps,
}
