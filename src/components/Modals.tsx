import ConfirmRegistrationModal from "./ConfirmRegistrationModal"
import LoginModal from "./LoginModal"
// import ProfileModal from "./ProfileModal"
import TermsOfUseModal from "./TermsOfUseModal"
import ConfirmChangePasswordModal from "./ConfirmChangePasswordModal"
import ConfirmChangePlanRequestModal from "./ConfirmChangePlanRequestModal"
import { useBrowserStore } from "../store"
import { BrowserViewConfirmRegistration, BrowserViewLogin } from "../constants"

const Modals: React.FC<{ termsOfuseContent?: string }> = ({
  termsOfuseContent = "",
}) => {
  const view = useBrowserStore((state) => state.view)
  const setView = useBrowserStore((state) => state.setView)
  return (
    <div className="Modals">
      <LoginModal
        show={view === BrowserViewLogin}
        onHide={() => setView(null)}
      />
      <ConfirmRegistrationModal
        show={view === BrowserViewConfirmRegistration}
        onHide={() => setView(null)}
      />
      <ConfirmChangePasswordModal />
      <ConfirmChangePlanRequestModal />
      <TermsOfUseModal content={termsOfuseContent} autoOpenAfterDelay={false} />
    </div>
  )
}

export default Modals
