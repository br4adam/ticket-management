import { useTranslation } from "react-i18next"
import nomessages from "../../assets/no-messages.webp"

const NoMessages = () => {
  const { t } = useTranslation()

  return (
    <div className="no-messages">
      <h3>{t("ticket.no-messages-title")}</h3>
      <p>{t("ticket.no-messages-description")}</p>
      <img src={nomessages} alt="no messages" />
    </div>
  )
}

export default NoMessages