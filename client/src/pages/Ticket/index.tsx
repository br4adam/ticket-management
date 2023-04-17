import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getTicket, type TicketType } from "../../api/tickets"
import Select from "../../components/Select"
import Details from "./Details"
import Messages from "./Messages"
import EmptyState from "../../components/EmptyState"
import useGlobal from "../../hooks/useGlobal"
import { user$ } from "../../states/user"

const priorities = [ "low", "medium", "high" ]
const statuses = [ "open", "pending", "closed" ]

const Ticket = () => {
  const [ ticket, setTicket ] = useState<TicketType>()
  const user = useGlobal(user$)
  const { id } = useParams()
  const isAdmin = user && ticket?.company.admins.includes(user._id)

  console.log(isAdmin)

  useEffect(() => {
    if (!id) return
    const loadTicket = async () => {
      const data = await getTicket(id)
      if (!data) return
      setTicket(data)
    }
    loadTicket()
  }, [])

  if (!ticket) return (
    <EmptyState>
      <p className="title">{`Ticket with Id "${id}" not found`}</p>
      <p>Check the Id of the ticket again.</p>
    </EmptyState>
  )

  return (
    <div className="ticket wrapper">
      <h1>{ticket?.subject || "Ticket details"}</h1>
      <section className="select-elements">
        <Select options={statuses} disabled={!isAdmin} />
        <Select options={priorities} disabled={!isAdmin} />
      </section>
      { ticket && <Details ticket={ticket} /> }
      { ticket?.messages && <Messages messages={ticket.messages} /> }
    </div>
  )
}

export default Ticket