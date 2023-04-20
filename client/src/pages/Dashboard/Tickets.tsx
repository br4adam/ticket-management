import { getTickets } from "../../api/tickets"
import type { TicketType } from "../../api/tickets"
import TicketHeader from "./TicketHeader"
import TicketBar from "./TicketBar"
import EmptyState from "../../components/EmptyState"
import Loader from "../../components/Loader"
import useApi from "../../hooks/useApi"

const Tickets = () => {
  const { data: tickets, loading } = useApi<TicketType[]>(getTickets)

  return (
    <section className="tickets container">
      <p className="title">Latest Tickets</p>
      { loading && <Loader /> }
      { tickets?.length
        ? <div className="scrollable">
          <TicketHeader />
          { tickets && tickets.map(ticket => <TicketBar key={ticket._id} {...ticket} /> )}
          </div>
        : <EmptyState loading={loading}>
            <p className="title">No tickets found</p>
            <p>Create your first ticket and it will show up here.</p>
          </EmptyState>
        }
    </section>
  )
}

export default Tickets