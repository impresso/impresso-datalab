import ConfirmRegistrationModal from "./ConfirmRegistrationModal"
import LoginModal from "./LoginModal"
import RegisterModal from "./RegisterModal"
import ProfileModal from "./ProfileModal"
import TermsOfUseModal from "./TermsOfUseModal"

const Modals: React.FC<{ termsOfuseContent: string }> = ({
  termsOfuseContent,
}) => {
  return (
    <div className="Modals">
      <LoginModal />
      <RegisterModal />
      <ProfileModal />
      <ConfirmRegistrationModal />
      <TermsOfUseModal content={termsOfuseContent} autoOpenAfterDelay={false} />
    </div>
  )
}

export default Modals
