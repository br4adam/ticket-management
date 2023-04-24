import useApi from "../../hooks/useApi"
import { getUser, type UserType } from "../../api/users"
import Loader from "../../components/Loader"
import EditProfile from "./EditProfile"
import Logout from "./Logout"

const Profile = () => {
  const { data: user, loading, refresh } = useApi<UserType>(getUser)

  return (
    <div className="profile wrapper">
      <h1>Profile</h1>
      { loading && <Loader /> }
      { user && <EditProfile user={user} refresh={refresh} /> }
      <Logout />
    </div>
  )
}

export default Profile