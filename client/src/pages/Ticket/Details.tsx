import { FC } from "react"
import { type TicketType } from "../../api/tickets"
import formatDate from "../../utils/formatDate"

type Props = {
  ticket: TicketType
}

const Details: FC<Props> = ({ ticket }) => {
  console.log(ticket)
  return (
    <section className="details container">
      <div className="data">
        <div>
          <p>Ticket Id</p>
          <p>{ ticket._id }</p>
        </div>
        <div>
          <p>Subject</p>
          <p>{ ticket.subject }</p>
        </div>
        <div>
          <p>Created by</p>
          <p>{ ticket.createdBy?.name }</p>
        </div>
        <div>
          <p>Created at</p>
          <p>{ formatDate(ticket.createdAt) }</p>
        </div>
        <div>
          <p>Updated at</p>
          <p>{ formatDate(ticket.updatedAt) }</p>
        </div>
        <div>
          <p>Description</p>
          <p>{ ticket.description || "-"} </p>
        </div>
      </div>
    </section>
  )
}

export default Details