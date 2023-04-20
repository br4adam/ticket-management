import { FC } from "react"
import Avatar from "../../components/Avatar"
import avatars from "../../assets/avatars"
import defaultAvatar from "../../assets/default-avatar.webp"
import { UserType } from "../../api/users"

type Props = {
  user: UserType
}

const UserCard: FC<Props> = ({ user }) => {
  const avatar = avatars.find(a => a.includes(user.avatar!)) || defaultAvatar
  const isAdmin = user.company?.admins.includes(user._id)

  console.log(user)
  return (
    <div className="user container">
      <Avatar image={avatar} />
      <p className="title">{ user.name } <span className="admin">{ isAdmin && "admin" }</span></p>
      <div className="user-data">
        <p>{ user.email }</p>
        <p>{ user.phone }</p>
      </div>
    </div>
  )
}

export default UserCard