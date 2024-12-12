import Avatar from "boring-avatars"
import {
  PlanResearcher,
  PlanEducational,
  Plans,
  PlanImpressoUser,
} from "../constants"
import type { User } from "../types"

const UserCard = ({
  className = "",
  user,
  userPlan = PlanImpressoUser,
}: {
  className?: string
  user: User
  userPlan?: (typeof Plans)[number] | null
}) => {
  console.debug("[UserCard] rendering:", user)
  let role = user.isStaff ? "Staff - as Basic User" : "Basic User"
  if (userPlan) {
    if (userPlan === PlanEducational) {
      role = user.isStaff ? "Staff - as Student" : "Student"
    } else if (userPlan === PlanResearcher) {
      role = user.isStaff ? "Staff - as Academic" : "Academic"
    }
  }

  let displayedName = ""
  if (user.firstname && user.firstname.length > 0) {
    displayedName = user.firstname + " "
  }
  if (user.lastname && user.lastname.length > 0) {
    displayedName += user.lastname
  }
  if (displayedName.length === 0) {
    displayedName = user.username
  }

  return (
    <div className={`UserCard d-flex align-items-center ${className}`}>
      <div className="me-2">
        <Avatar
          size={30}
          name={user.username}
          variant={"sunset"}
          colors={user.pattern ? user.pattern.split(",") : []}
        />
      </div>
      <div>
        <h3 className="m-0 small">{displayedName}</h3>
        <p className="m-0 smallcaps">{role}</p>
      </div>
    </div>
  )
}

export default UserCard
