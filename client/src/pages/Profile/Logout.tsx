import { useNavigate } from "react-router-dom"
import { logout } from "../../states/user"
import { useTranslation } from "react-i18next"

const Logout = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  
  const logOut = () => {
    logout()
    navigate(0)
  }

  return (
    <div className="logout container">
      <div>
        <h2>{t("profile.logout-title")}</h2>
        <p>{t("profile.logout-description")}</p>
      </div>
      <button className="solid" onClick={logOut}>{t("profile.logout-button")}</button>
    </div>
  )
}

export default Logout