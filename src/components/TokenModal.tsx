import Page from "./Page"
import TokenWrapper from "./TokenWrapper"

const TokenModal: React.FC = () => {
  return (
    <Page
      size="lg"
      fullscreen="md-down"
      title="Your API Token - Impresso Datalab"
    >
      <TokenWrapper />
    </Page>
  )
}

export default TokenModal
