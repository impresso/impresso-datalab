import type { Meta, StoryObj } from "@storybook/react"
// import { fn } from "@storybook/test"
import ConfirmChangePlanRequestModal from "../../components/ConfirmChangePlanRequestModal"
import { useBrowserStore } from "../../store"
import { useEffect } from "react"
import { BrowserViewConfirmChangePlanRequest } from "../../constants"

const meta: Meta<typeof ConfirmChangePlanRequestModal> = {
  component: ConfirmChangePlanRequestModal,
  render: () => {
    const setView = useBrowserStore((state) => state.setView)
    useEffect(() => {
      setView(BrowserViewConfirmChangePlanRequest)
    }, [])
    return (
      <div style={{ maxWidth: "400px" }}>
        <ConfirmChangePlanRequestModal />
      </div>
    )
  },
}

export default meta
type Story = StoryObj<typeof ConfirmChangePlanRequestModal>

export const Default: Story = {
  args: {},
}
