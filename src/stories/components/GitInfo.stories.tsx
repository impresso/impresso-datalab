import type { Meta, StoryObj } from "@storybook/react"
// import { fn } from "@storybook/test"
import GitInfo from "../../components/GitInfo"
import type { GitInfoProps } from "../../components/GitInfo"

const meta: Meta<typeof GitInfo> = {
  component: GitInfo,
  render: (args) => (
    <div style={{ maxWidth: "400px" }}>
      <GitInfo {...args} />
    </div>
  ),
}

export default meta
type Story = StoryObj<typeof GitInfo>

export const Default: Story = {
  args: {
    version: "night buiild",
    gitBuildDate: "2021-09-29T10:00",
    gitBranch: "main",
    gitCommitSha: "e1c1b9c",
    gitTag: "0.1.0",
    gitRemoteOriginUrl: "https://github.com/impresso/impresso-datalab.git",
  } as GitInfoProps,
}
