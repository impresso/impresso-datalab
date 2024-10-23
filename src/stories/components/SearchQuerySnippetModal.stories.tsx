import type { Meta, StoryObj } from "@storybook/react"
// import { fn } from "@storybook/test"
import SearchQuerySnippetModal from "../../components/SearchQuerySnippetModal"
import type { SearchQuerySnippetProps } from "../../components/SearchQuerySnippet"

const SearchQuerySnippetPropsSqSample =
  "CgIYAgogEAIYByABKgRsdW5lKgdsdW5haXJlKglwbGFuw6h0ZXMKMhACGAoqLDE5NTAtMDEtMDFUMDA6MDA6MDBaIFRPIDIwMTgtMTItMzFUMjM6NTk6NTla"

const meta: Meta<typeof SearchQuerySnippetModal> = {
  component: SearchQuerySnippetModal,
  render: (args) => (
    <div style={{ maxWidth: "400px" }}>
      <SearchQuerySnippetModal {...args} />
    </div>
  ),
}

export default meta
type Story = StoryObj<typeof SearchQuerySnippetModal>

export const Default: Story = {
  args: {
    sq: SearchQuerySnippetPropsSqSample,
    debug: false,
  } as SearchQuerySnippetProps,
}
