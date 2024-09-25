import "./AssociatedPartner.css"

export interface AssociatedPartnerProps {
  id: string
  name: string
  url: string
}

const AssociatedPartner: React.FC<AssociatedPartnerProps> = ({
  name,
  id,
  url,
}) => {
  return (
    <a className="AssociatedPartner" href={url} target="_blank">
      {name} {id}
    </a>
  )
}

export default AssociatedPartner
