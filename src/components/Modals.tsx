import ConfirmRegistrationModal from "./ConfirmRegistrationModal"
import LoginModal from "./LoginModal"
// import ProfileModal from "./ProfileModal"
import TermsOfUseModal from "./TermsOfUseModal"
import ConfirmChangePasswordModal from "./ConfirmChangePasswordModal"
import ConfirmChangePlanRequestModal from "./ConfirmChangePlanRequestModal"
// import ChangePlanRequestModal from "./ChangePlanRequestModal"

const Modals: React.FC<{ termsOfuseContent?: string }> = ({
  termsOfuseContent = "",
}) => {
  return (
    <div className="Modals">
      <LoginModal />
      {/* <ProfileModal /> */}
      {/* <ChangePlanRequestModal /> */}
      <ConfirmRegistrationModal />
      <ConfirmChangePasswordModal />
      <ConfirmChangePlanRequestModal />
      <TermsOfUseModal content={termsOfuseContent} autoOpenAfterDelay={false} />
    </div>
  )
}

export default Modals
