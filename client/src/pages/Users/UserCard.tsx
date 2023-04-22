import { FC } from "react"
import Avatar from "../../components/Avatar"
import { UserType } from "../../api/users"

type Props = {
  user: UserType
}

const UserCard: FC<Props> = ({ user }) => {
  const isAdmin = user.company?.admins.includes(user._id)

  return (
    <div className="user container">
      <Avatar image={user.avatar!} />
      <p className="title">{ user.name } <span className="admin">{ isAdmin && "admin" }</span></p>
      <div className="user-data">
        <p>{ user.email }</p>
        <p>{ user.phone }</p>
      </div>
    </div>
  )
}

export default UserCard