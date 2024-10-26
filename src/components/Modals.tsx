import LoginModal from "./LoginModal"
import RegisterModal from "./RegisterModal"
import TermsOfUseModal from "./TermsOfUseModal"

const Modals: React.FC<{ termsOfuseContent: string }> = ({
  termsOfuseContent,
}) => {
  return (
    <div className="Modals">
      <LoginModal />
      <RegisterModal />
      <TermsOfUseModal content={termsOfuseContent} autoOpenAfterDelay={false} />
    </div>
  )
}

export default Modals
