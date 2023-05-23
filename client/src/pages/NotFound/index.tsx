import { Link } from "react-router-dom"
import notfound from "../../assets/not-found.webp"
import { useTranslation } from "react-i18next"

const NotFound = () => {
  const { t } = useTranslation()

  return (
    <div className="notfound wrapper">
      <img src={notfound} alt="page not found" />
      <Link to="/" className="solid">{t("notfound.button")}</Link>
    </div>
  )
}

export default NotFound