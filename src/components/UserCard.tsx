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
  let role = user.isStaff ? "Staff" : "Basic User"

  if (user.groups) {
    if (user.groups.includes(PlanStudentUser)) {
      role = "Student"
    } else if (user.groups.includes(PlanAcademicUser)) {
      role = "Academic"
    }
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
        <h3 className="m-0 small">
          {user.firstname} {user.lastname}
        </h3>
        <p className="m-0 smallcaps">{role}</p>
      </div>
    </div>
  )
}

export default UserCard
