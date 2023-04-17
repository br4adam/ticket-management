import { useState, useEffect } from "react"
import { getTickets } from "../../api/tickets"
import type { TicketType } from "../../api/tickets"
import TicketHeader from "./TicketHeader"
import TicketBar from "./TicketBar"
import EmptyState from "../../components/EmptyState"

const Tickets = () => {
  const [ tickets, setTickets ] = useState<TicketType[]>([])
  const hasTickets = !!tickets.length

  useEffect(() => {
    const loadTickets = async () => {
      const data = await getTickets()
      if (!data) return
      setTickets(data)
    }
    loadTickets()
  }, [])

  return (
    <section className="tickets container">
      <p className="title">Latest Tickets</p>
      { hasTickets
        ? <div className="scrollable">
          <TicketHeader />
          { tickets && tickets.map(ticket => <TicketBar key={ticket._id} {...ticket} /> )}
          </div>
        : <EmptyState>
            <p>No tickets found</p>
            <p>Create your first ticket and it will show up here.</p>
          </EmptyState>
        }
    </section>
  )
}

export default Tickets