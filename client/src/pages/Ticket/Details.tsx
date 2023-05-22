import { FC } from "react"
import { type TicketType } from "../../api/tickets"
import formatDate from "../../utils/formatDate"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

type Props = {
  ticket: TicketType
}

const Details: FC<Props> = ({ ticket }) => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <section className="details container">
      <div className="data">
        <div>
          <p>{t("ticket.id")}</p>
          <p>{ ticket._id }</p>
        </div>
        <div>
          <p>{t("ticket.subject")}</p>
          <p>{ ticket.subject }</p>
        </div>
        <div>
          <p>{t("ticket.created-by")}</p>
          <p onClick={() => navigate("/users", { state: ticket.createdBy.name })} className="created-by">{ ticket.createdBy.name }</p>
        </div>
        <div>
          <p>{t("ticket.created")}</p>
          <p>{ formatDate(ticket.createdAt) }</p>
        </div>
        <div>
          <p>{t("ticket.updated")}</p>
          <p>{ formatDate(ticket.updatedAt) }</p>
        </div>
        <div>
          <p>{t("ticket.description")}</p>
          <p>{ ticket.description || "-"} </p>
        </div>
      </div>
    </section>
  )
}

export default Details