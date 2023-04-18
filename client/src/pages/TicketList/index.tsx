import { useNavigate } from "react-router-dom"
import { getTickets, type TicketType } from "../../api/tickets"
import TicketHeader from "../Dashboard/TicketHeader"
import TicketBar from "../Dashboard/TicketBar"
import EmptyState from "../../components/EmptyState"
import Loader from "../../components/Loader"
import Search from "./Search"
import useApi from "../../hooks/useApi"

const Tickets = () => {
  const { data: tickets, loading } = useApi<TicketType[]>(getTickets)
  const navigate = useNavigate()

  return (
    <div className="ticketlist wrapper">
      <div>
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
            <p>No tickets found</p>
            <p>Create your first ticket and it will show up here.</p>
            <button className="solid" onClick={() => navigate("/create")}>Create Ticket</button>
          </EmptyState>
        }
      </section>
    </div>
  )
}

export default Tickets