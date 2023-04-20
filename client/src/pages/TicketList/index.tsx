import { getTickets, type TicketType } from "../../api/tickets"
import TicketHeader from "../Dashboard/TicketHeader"
import TicketBar from "../Dashboard/TicketBar"
import EmptyState from "../../components/EmptyState"
import Loader from "../../components/Loader"
import Search from "./Search"
import useApi from "../../hooks/useApi"

const Tickets = () => {
  const { data: tickets, loading } = useApi<TicketType[]>(getTickets)

  return (
    <div className="ticketlist wrapper">
      <div className="topbar">
        <h1>Tickets</h1>
        <Search />
      </div>
      <section className="tickets container">
        <p className="title">All Tickets { tickets && <span>({ tickets.length })</span> }</p>
        { loading && <Loader /> }
        { tickets
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
    </div>
  )
}

export default Tickets