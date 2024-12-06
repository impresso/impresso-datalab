import type { Meta, StoryObj } from "@storybook/react"
// import { fn } from "@storybook/test"
import type {
  DatasetCardProps,
  DatasetPeriod,
} from "../../components/DatasetCard"
import DatasetCard from "../../components/DatasetCard"

const meta: Meta<typeof DatasetCard> = {
  component: DatasetCard,
  render: (args) => (
    <div style={{ maxWidth: "400px" }}>
      <DatasetCard {...args} />
    </div>
  ),
}

export default meta
type Story = StoryObj<typeof DatasetCard>

export const Default: Story = {
  args: {
    dataset: {
      title: "Swiss Newspapers",
      description: "A collection of Swiss newspapers",
      periods: [
        {
          data_partner_institution: "SNL",
          media_alias: "BLB",
          media_title: "B\u00fcndner Landbote",
          time_period: "1846-1847",
          media: "Newspaper",
          medium: "print",
          copyright_or_copyright_status: "Public Domain",
          permitted_use: "Personal, Research and Educational",
          minimum_user_plan_required_to_explore_in_the_webapp:
            "Guest User Plan",
          minimum_user_plan_required_to_export_transcripts: "Basic User Plan",
          minimum_user_plan_required_to_export_illustration: "Basic User Plan",
          partner_bitmap_index: 5,
        },
        {
          data_partner_institution: "SNL",
          media_alias: "BNN",
          media_title: "B\u00fcndner Nachrichten",
          time_period: "1885-1892",
          media: "Newspaper",
          medium: "print",
          copyright_or_copyright_status: "Public Domain",
          permitted_use: "Personal, Research and Educational",
          minimum_user_plan_required_to_explore_in_the_webapp:
            "Guest User Plan",
          minimum_user_plan_required_to_export_transcripts: "Basic User Plan",
          minimum_user_plan_required_to_export_illustration: "Basic User Plan",
          partner_bitmap_index: 5,
        },
      ] as DatasetPeriod[],
    },
  } as DatasetCardProps,
}
