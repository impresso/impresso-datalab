import ConfirmRegistrationModal from "./ConfirmRegistrationModal"
import LoginModal from "./LoginModal"
import RegisterModal from "./RegisterModal"
import ProfileModal from "./ProfileModal"
import TermsOfUseModal from "./TermsOfUseModal"
import ChangePasswordModal from "./ChangePasswordModal"
import ConfirmChangePasswordModal from "./ConfirmChangePasswordModal"
import ConfirmChangePlanRequestModal from "./ConfirmChangePlanRequestModal"
import ChangePlanRequestModal from "./ChangePlanRequestModal"

const Modals: React.FC<{ termsOfuseContent?: string }> = ({
  termsOfuseContent = "",
}) => {
  return (
    <div className="Modals">
      <LoginModal />
      <RegisterModal />
      <ProfileModal />
      <ChangePasswordModal />
      <ChangePlanRequestModal />
      <ConfirmRegistrationModal />
      <ConfirmChangePasswordModal />
      <ConfirmChangePlanRequestModal />
      <TermsOfUseModal content={termsOfuseContent} autoOpenAfterDelay={false} />
    </div>
  )
}

export default Modals
