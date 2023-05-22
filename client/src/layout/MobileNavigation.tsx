import { FC } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Dashboard, ListBoxes, DocumentAdd, User, Login, Logout } from "@carbon/icons-react"
import useGlobal from "../hooks/useGlobal"
import { user$, logout } from "../states/user"
import createGoogleUrl from "../utils/createGoogleUrl"
import { useTranslation } from "react-i18next"

type Props = {
  isOpen: boolean
  onClick: () => void
}

const MobileNavigation: FC<Props> = ({ isOpen, onClick }) => {
  const user = useGlobal(user$)
  const navigate = useNavigate()
  const { t } = useTranslation()

  const logOut = () => {
    logout()
    onClick()
    navigate(0)
  }

  return (
    <nav className={ isOpen ? "mobile slide" : "mobile" }>
      { user?.company
      ? <>
          <Link to="/dashboard" onClick={onClick} className="link"><Dashboard />{t("mobilenav.dashboard")}</Link>
          <Link to="/tickets" onClick={onClick} className="link"><ListBoxes />{t("mobilenav.tickets")}</Link>
          <Link to="/create" onClick={onClick} className="link"><DocumentAdd />{t("mobilenav.create")}</Link>
          <Link to="/profile" onClick={onClick} className="link"><User />{t("mobilenav.profile")}</Link>
          <button onClick={logOut} className="link"><Logout />{t("mobilenav.logout")}</button>
        </>
      : <Link to={createGoogleUrl()} className="linke"><Login />{t("mobilenav.login")}</Link>
      }
    </nav>
  )
}

export default MobileNavigation