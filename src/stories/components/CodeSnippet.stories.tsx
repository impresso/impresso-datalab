import type { Meta, StoryObj } from "@storybook/react"
// import { fn } from "@storybook/test"
import CodeSnippet from "../../components/CodeSnippet"
import type { CodeSnippetProps } from "../../components/CodeSnippet"

const CodeSnippetPropsValueSample = `
# Example
text = "Mon nom est François et j'habite à Paris. (Reuter)"
nlp(text)
`

const meta: Meta<typeof CodeSnippet> = {
  component: CodeSnippet,
  render: (args) => (
    <div style={{ maxWidth: "400px" }}>
      <CodeSnippet {...args} />
    </div>
  ),
}

export default meta
type Story = StoryObj<typeof CodeSnippet>

export const Default: Story = {
  args: {
    value: CodeSnippetPropsValueSample.trim(),
    readonly: true,
  } as CodeSnippetProps,
}
