import useApi from "../../hooks/useApi"
import { getUser, type UserType } from "../../api/users"
import Loader from "../../components/Loader"
import EditProfile from "./EditProfile"
import Logout from "./Logout"
import { useTranslation } from "react-i18next"

const Profile = () => {
  const { data: user, loading, refresh } = useApi<UserType>(getUser)
  const { t } = useTranslation()

  return (
    <div className="profile wrapper">
      <h1>{t("profile.title")}</h1>
      { loading
        ? <Loader /> 
        : <>
          { user && <EditProfile user={user} refresh={refresh} /> }
          <Logout />
          </>
      }
    </div>
  )
}

export default Profile