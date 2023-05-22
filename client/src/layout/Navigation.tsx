import { Link } from "react-router-dom"
import useGlobal from "../hooks/useGlobal"
import { user$ } from "../states/user"
import Avatar from "../components/Avatar"
import createGoogleUrl from "../utils/createGoogleUrl"
import { useTranslation } from "react-i18next"

const Navigation = () => {
  const user = useGlobal(user$)
  const { t } = useTranslation()
  
  return (
    <nav>
      { user?.company
      ? <>
          <Link to="/dashboard" className="link">{t("navigation.dashboard")}</Link>
          <Link to="/tickets" className="link">{t("navigation.tickets")}</Link>
          <Link to="/create" className="outline">{t("navigation.new-ticket")}</Link>
          <Link to="/profile"><Avatar image={user.avatar!} /></Link>
        </>
      : <Link to={createGoogleUrl()} className="outline">{t("navigation.login")}</Link>
      }
    </nav>
  )
}

export default Navigation