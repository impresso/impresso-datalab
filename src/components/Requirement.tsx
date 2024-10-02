
import { CheckCircle, WarningCircle } from "iconoir-react"
import { RequirementsLabels, type Requirements } from "../constants";

export type RequirementType =(typeof Requirements)[number];

const Requirement = ({ requirement, isOk=false }: { 
  requirement: RequirementType,
  isOk?: boolean
  }) => {
  
  return (
    <div className="d-flex align-items-center w-100 mb-2">
      {isOk? <CheckCircle />: <WarningCircle color="orange"/>}
      <p className="ms-2 m-0 p-0">{RequirementsLabels[requirement]}</p>
    </div>
  )
}
// 

// <div key={requirement} className="PlanCard-item d-flex">
// <i
//   className={`PlanCard-icon d-flex ${iconColorCheck(requirement)}`}
// >
//   {iconStatusCheck(requirement)}
// </i>
// <p>{RequirementsLabels[requirement]}</p>
// </div>

export default Requirement