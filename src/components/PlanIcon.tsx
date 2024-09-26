import "./PlanIcon.css"

export interface PlanIconProps {
  size: number
  value: string
}

const PlanIcon: React.FC<PlanIconProps> = ({ size = 80, value = "" }) => {
  return (
    <div className="PlanIcon" style={{ height: size, width: size }}>
      {value}
    </div>
  )
}

export default PlanIcon
