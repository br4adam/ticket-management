import { useState } from "react"
import { useLocation } from "react-router-dom"
import UserCard from "./UserCard"
import Loader from "../../components/Loader"
import { getUsers } from "../../api/users"
import useApi from "../../hooks/useApi"
import { useTranslation } from "react-i18next"

const Users = () => {
  const { state } = useLocation()
  const { data: users, loading } = useApi(getUsers, [])
  const [ searchValue, setSearchValue ] = useState<string>(state || "")
  const { t } = useTranslation()

  const filteredUsers = users && users.filter(user => user.name.toLowerCase().includes(searchValue.toLocaleLowerCase()))

  return (
    <div className="users wrapper">
      <div className="searchbar">
        <h1>{t("users.title")}</h1>
        <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder={t("users.placeholder")} />
      </div>
      { loading
        ? <Loader />
        : <div className="usersflex">
          { filteredUsers && filteredUsers.map(user => <UserCard key={user._id} user={user} />) }
          </div>
      }
    </div>
  )
}

export default Users