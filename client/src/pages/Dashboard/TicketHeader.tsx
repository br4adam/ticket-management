import { ArrowRight } from "@carbon/icons-react"
import { useTranslation } from "react-i18next"

const TicketHeader = () => {
  const { t } = useTranslation()

  return (
    <div className="ticketheader">
      <div className="id">
        <p>{t("ticketbar.id")}</p>
      </div>
      <div className="user">
        <p>{t("ticketbar.name")}</p>
      </div>
      <p className="subject">{t("ticketbar.subject")}</p>
      <p className={"status"}>{t("ticketbar.status")}</p>
      <div className="priority">
        <p>{t("ticketbar.priority")}</p>
      </div>
      <p className="date">{t("ticketbar.created")}</p>
      <ArrowRight />
    </div>
  )
}

export default TicketHeader