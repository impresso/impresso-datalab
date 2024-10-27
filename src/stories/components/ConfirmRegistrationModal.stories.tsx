import type { Meta, StoryObj } from "@storybook/react"
// import { fn } from "@storybook/test"
import ConfirmRegistrationModal from "../../components/ConfirmRegistrationModal"
import { useBrowserStore } from "../../store"
import { useEffect } from "react"
import { BrowserViewConfirmRegistration } from "../../constants"

const meta: Meta<typeof ConfirmRegistrationModal> = {
  component: ConfirmRegistrationModal,
  render: () => {
    const setView = useBrowserStore((state) => state.setView)
    useEffect(() => {
      setView(BrowserViewConfirmRegistration)
    }, [])
    return (
      <div style={{ maxWidth: "400px" }}>
        <ConfirmRegistrationModal />
      </div>
    )
  },
}

export default meta
type Story = StoryObj<typeof ConfirmRegistrationModal>

export const Default: Story = {
  args: {},
}
