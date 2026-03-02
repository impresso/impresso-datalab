import type { Meta, StoryObj } from "@storybook/react"
import Citation from "../../components/Citation"
import { type CitationProps } from "../../components/Citation"

const CitationBibtexSample = `
@misc{ehrmann_named_2018,
  type = {Blogpost},
  title = {Named entity processing in a nutshell},
  url = {https://impresso-project.ch/news/2018/06/12/tradingzone-ner.html},
  abstract = {Trading zone part 1: Named Entity Processing. This blog post is part of Stepping in the NLP / History trading zone: a series of posts.},
  language = {en},
  urldate = {2019-01-09},
  journal = {impresso},
  author = {Ehrmann, Maud},
  month = jun,
  year = {2018},
  file = {Snapshot:/Users/daniele.guido/Zotero/storage/9F9K6RPX/tradingzone-ner.html:text/html},
}
`

const meta: Meta<typeof Citation> = {
  component: Citation,
  render: (args) => (
    <div style={{ maxWidth: "700px" }}>
      <Citation {...args} />
    </div>
  ),
}

export default meta
type Story = StoryObj<typeof Citation>

export const Default: Story = {
  args: {
    bibtex: CitationBibtexSample.trim(),
    format: "html",
    showCopyButton: true,
  } as CitationProps,
}
