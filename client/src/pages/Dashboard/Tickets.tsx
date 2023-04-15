import { useState, useEffect } from "react"
import { getTickets } from "../../api/tickets"
import type { TicketType } from "../../api/tickets"
import TicketHeader from "./TicketHeader"
import TicketBar from "./TicketBar"

const Tickets = () => {
  const [ tickets, setTickets ] = useState<TicketType[]>([])

  useEffect(() => {
    const loadTickets = async () => {
      const data = await getTickets()
      if (!data) return
      setTickets(data)
    }
    loadTickets()
  }, [])

  return (
    <div className="tickets container">
      <p className="title">Latest Tickets</p>
      <div className="scrollable">
        <TicketHeader />
        { tickets && tickets.map(ticket => <TicketBar key={ticket._id} {...ticket} /> )}
      </div>
    </div>
  )
}

export default Tickets