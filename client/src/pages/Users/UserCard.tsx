import Avatar from "../../components/Avatar"
import { UserType } from "../../api/users"

type Props = {
  user: UserType
}

const UserCard = ({ user }: Props) => {
  const isAdmin = user.company?.admins.includes(user._id)

  return (
    <div className="user container">
      <Avatar image={user.avatar!} />
      <h2>
        { user.name }
        { isAdmin && <span className="admin">admin</span> }
      </h2>
      <div className="user-data">
        <p>{ user.email }</p>
        <p>{ user.phone }</p>
      </div>
    </div>
  )
}

export default UserCard