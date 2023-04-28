import { getTickets } from "../../api/tickets"
import type { TicketListType } from "../../api/tickets"
import TicketHeader from "./TicketHeader"
import TicketBar from "./TicketBar"
import EmptyState from "../../components/EmptyState"
import Loader from "../../components/Loader"
import useApi from "../../hooks/useApi"

const Tickets = () => {
  const { data, loading } = useApi<TicketListType>(() => getTickets(10, 1))

  if (loading) return <Loader />

  return (
    <section className="tickets container">
      <h2>Latest Tickets</h2>
      { data?.tickets.length
        ? <div className="scrollable">
          <TicketHeader />
          { data.tickets.map(ticket => <TicketBar key={ticket._id} ticket={ticket} /> )}
          </div>
        : <EmptyState loading={loading}>
            <h3>No tickets found</h3>
            <p>Create your first ticket and it will show up here.</p>
          </EmptyState>
        }
    </section>
  )
}

export default Tickets