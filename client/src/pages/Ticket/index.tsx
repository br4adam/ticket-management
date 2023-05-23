import { useParams } from "react-router-dom"
import { getTicket, updateTicket, type TicketType } from "../../api/tickets"
import Select from "../../components/Select"
import Details from "./Details"
import Messages from "./Messages"
import EmptyState from "../../components/EmptyState"
import { user$ } from "../../states/user"
import useGlobal from "../../hooks/useGlobal"
import useApi from "../../hooks/useApi"
import Loader from "../../components/Loader"
import { useTranslation } from "react-i18next"

const Ticket = () => {
  const { id } = useParams()
  const { data: ticket, loading, refresh } = useApi<TicketType>(() => getTicket(id!))
  const user = useGlobal(user$)
  const { t } = useTranslation()

  if (!id || !ticket) return (
    <EmptyState loading={loading}>
      <h3>{t("emptystate.no-ticket", { id: id })}</h3>
      <p>{t("emptystate.no-ticket-description")}</p>
    </EmptyState>
  )

  const updateStatus = async (value: string) => await updateTicket(id, { status: value })
  const updatePriority = async (value: string) => await updateTicket(id, { priority: value })

  const isAdmin = user?.isAdmin || false

  return (
    <div className="ticket wrapper">
      <h1>{t("ticket.title")}</h1>
      { loading
        ? <Loader/> 
        : <>
          <section className="select-elements">
            <Select options={[ "open", "pending", "closed" ]} disabled={!isAdmin} def={ticket.status} onSelect={updateStatus} />
            <Select options={[ "low", "medium", "high" ]} disabled={!isAdmin} def={ticket.priority} onSelect={updatePriority} />
          </section>
          { ticket && <Details ticket={ticket} /> }
          { ticket.messages && <Messages messages={ticket.messages} refresh={refresh} /> }  
        </>
      }
    </div>
  )
}

export default Ticket