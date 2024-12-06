import Avatar from "boring-avatars"
import { PlanAcademicUser, PlanStudentUser } from "../constants"

export interface User {
  username: string
  isStaff: boolean
  firstname?: string
  lastname?: string
  pattern?: string
  email?: string
  profile?: {
    pattern: string[]
  }
  bitmap?: string
  groups?: string[]
  agreedToTerms?: boolean
}

const UserCard = ({
  className = "",
  user,
}: {
  className?: string
  user: User
}) => {
  console.debug("[UserCard] rendering:", user)
  let role = user.isStaff ? "Staff - as Basic User" : "Basic User"

  if (user.groups) {
    if (user.groups.includes(PlanStudentUser)) {
      role = user.isStaff ? "Staff - as Student" : "Student"
    } else if (user.groups.includes(PlanAcademicUser)) {
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
