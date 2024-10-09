import Avatar from "boring-avatars"

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

const UserCard = ({ user }: { user: User }) => {
  return (
    <div className="UserCard d-flex align-items-center">
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
        <p className="m-0 smallcaps">
          {user.isStaff ? "staff" : "researcher"}{" "}
        </p>
      </div>
    </div>
  )
}

export default UserCard
