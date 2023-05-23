import { getTickets } from "../../api/tickets"
import type { TicketListType } from "../../api/tickets"
import TicketHeader from "./TicketHeader"
import TicketBar from "./TicketBar"
import EmptyState from "../../components/EmptyState"
import Loader from "../../components/Loader"
import useApi from "../../hooks/useApi"
import { useTranslation } from "react-i18next"

const Tickets = () => {
  const { data, loading } = useApi<TicketListType>(() => getTickets(10, 1))
  const { t } = useTranslation()

  if (loading) return <Loader />

  return (
    <section className="tickets container">
      <h2>{t("dashboard.latest")}</h2>
      { data?.tickets.length
        ? <div className="scrollable">
          <TicketHeader />
          { data.tickets.map(ticket => <TicketBar key={ticket._id} ticket={ticket} /> )}
          </div>
        : <EmptyState loading={loading}>
            <h3>{t("emptystate.no-tickets")}</h3>
            <p>{t("emptystate.no-tickets-description")}</p>
          </EmptyState>
        }
    </section>
  )
}

export default Tickets