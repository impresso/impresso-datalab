import "./AssociatedPartner.css"

export interface AssociatedPartnerProps {
  name: string
  url: string
}

const AssociatedPartner: React.FC<AssociatedPartnerProps> = ({ name, url }) => {
  return (
    <a className="AssociatedPartner" href={url} target="_blank">
      {name}
    </a>
  )
}

export default AssociatedPartner
