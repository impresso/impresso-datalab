import Avatar from "boring-avatars"

export interface User {
  username: string
  isStaff: boolean
  profile?: {
    pattern: string[]
  }
}

const UserCard = ({ user }: { user: User }) => {
  return (
    <div className="UserCard d-flex align-items-center">
      <div className="me-2">
        <Avatar
          size={40}
          name={user.username}
          variant="pixel"
          colors={user.profile?.pattern}
        />
      </div>
      <div>
        <h3 className="m-0">{user.username}</h3>
        <p className="m-0">{user.isStaff ? "staff" : "researcher"} </p>
      </div>
    </div>
  )
}

export default UserCard
