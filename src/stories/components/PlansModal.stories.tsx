import type { Meta, StoryObj } from "@storybook/react"
// import { fn } from "@storybook/test"
import PlansModal from "../../components/PlansModal"
import type { PlansModalProps } from "../../components/PlansModal"

const meta: Meta<typeof PlansModal> = {
  component: PlansModal,
  render: (args) => (
    <div style={{ maxWidth: "400px" }}>
      <PlansModal {...args} />
    </div>
  ),
}

export default meta
type Story = StoryObj<typeof PlansModal>

export const Default: Story = {
  args: {
    plans: [
      {
        collection: "plans",
        href: "plans/01-guest",
        id: "guest",
        title: "Guest",
        icon: "basic",
        features: [
          {
            ref: "metadata",
          },
        ],
        requirements: ["terms-of-use"],
        body: "\nTry the Impresso Web app and the Impresso Datalab with access to public domain data.\n",
      },
      {
        collection: "plans",
        href: "plans/02-impresso-user",
        id: "impresso-user",
        title: "Impresso User",
        icon: "basic",
        features: [
          {
            ref: "explore-all-features",
          },
          {
            ref: "create-store-export-collections",
          },
          {
            ref: "generate-api-keys",
          },
          {
            ref: "metadata",
          },
          {
            ref: "facsimiles",
            title:
              "Access to protected data determined only by Impresso partners. <b>No download possible<b>",
            iconColor: "orange",
          },
          {
            ref: "audio",
            title: "<b>download<b>",
            iconColor: "orange",
          },
          {
            ref: "transcripts",
          },
          {
            ref: "images",
            title: "<b>download<b>",
            iconColor: "orange",
          },
          {
            ref: "semantic-enrichments",
          },
        ],
        requirements: ["terms-of-use", "impresso-account"],
        body: "\nAdds the ability to work with personal collections in the Impresso Web App and to access our API via the Datalab.\n",
      },
      {
        collection: "plans",
        href: "plans/03-student-user",
        id: "student-user",
        title: "Coming soon: Student User",
        icon: "basic",
        features: [
          {
            ref: "explore-all-features",
          },
          {
            ref: "create-store-export-collections",
          },
          {
            ref: "generate-api-keys",
          },
        ],
        requirements: [
          "terms-of-use",
          "impresso-account",
          "proof-of-student-enrollment",
        ],
        body: "\nAdds access to copyright-protected data available to students in higher education.\n",
      },
      {
        collection: "plans",
        href: "plans/04-academic-user",
        id: "academic-user",
        title: "Academic User",
        icon: "basic",
        features: [
          {
            ref: "explore-all-features",
          },
          {
            ref: "create-store-export-collections",
          },
          {
            ref: "generate-api-keys",
          },
          {
            ref: "metadata",
          },
          {
            ref: "facsimiles",
          },
        ],
        requirements: ["terms-of-use", "impresso-account"],
        body: "\nAdds access to copyright-protected data available for general research purposes.\n",
      },
      {
        collection: "plans",
        href: "plans/05-academic-user-plus",
        id: "academic-user-plus",
        title: "Coming soon: Academic User+",
        icon: "basic",
        features: [
          {
            ref: "explore-all-features",
          },
          {
            ref: "create-store-export-collections",
          },
          {
            ref: "generate-api-keys",
          },
          {
            ref: "metadata",
          },
          {
            ref: "facsimiles",
          },
        ],
        requirements: [
          "terms-of-use",
          "impresso-account",
          "data-access-granted",
        ],
        body: "\nAdds ability to request access to data which requires individual permission.\n",
      },
    ],
  } as PlansModalProps,
}
