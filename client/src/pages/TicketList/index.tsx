import { useState, useEffect } from "react"
import { getTickets } from "../../api/tickets"
import type { TicketType } from "../../api/tickets"
import TicketHeader from "../Dashboard/TicketHeader"
import TicketBar from "../Dashboard/TicketBar"
import EmptyState from "../../components/EmptyState"
import { useNavigate } from "react-router-dom"

const Tickets = () => {
  const [ tickets, setTickets ] = useState<TicketType[]>([])
  const hasTickets = !!tickets.length
  const navigate = useNavigate()

  useEffect(() => {
    const loadTickets = async () => {
      const data = await getTickets()
      if (!data) return
      setTickets(data)
    }
    loadTickets()
  }, [])

  return (
    <div className="ticketlist wrapper">
      <section className="tickets container">
        <p className="title">All Tickets { hasTickets && <span>({ tickets.length })</span> }</p>
        { hasTickets
        ? <div className="scrollable">
          <TicketHeader />
          { tickets && tickets.map(ticket => <TicketBar key={ticket._id} {...ticket} /> )}
          </div>
        : <EmptyState>
            <p className="title">No tickets found</p>
            <p>Create your first ticket and it will show up here.</p>
            <button className="solid" onClick={() => navigate("/create")}>Create Ticket</button>
          </EmptyState>
        }
      </section>
    </div>
  )
}

export default Tickets