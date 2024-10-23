import type { Meta, StoryObj } from "@storybook/react"
// import { fn } from "@storybook/test"
import SearchQuerySnippet from "../../components/SearchQuerySnippet"
import type { SearchQuerySnippetProps } from "../../components/SearchQuerySnippet"

const SearchQuerySnippetPropsSqSample =
  "CgIYAgogEAIYByABKgRsdW5lKgdsdW5haXJlKglwbGFuw6h0ZXMKMhACGAoqLDE5NTAtMDEtMDFUMDA6MDA6MDBaIFRPIDIwMTgtMTItMzFUMjM6NTk6NTla"

const meta: Meta<typeof SearchQuerySnippet> = {
  component: SearchQuerySnippet,
  render: (args) => (
    <div style={{ maxWidth: "400px" }}>
      <SearchQuerySnippet {...args} />
    </div>
  ),
}

export default meta
type Story = StoryObj<typeof SearchQuerySnippet>

export const Default: Story = {
  args: {
    sq: SearchQuerySnippetPropsSqSample,
    debug: false,
  } as SearchQuerySnippetProps,
}
