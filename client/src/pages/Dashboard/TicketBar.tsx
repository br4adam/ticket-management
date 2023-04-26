import { FC } from "react"
import { useNavigate } from "react-router-dom"
import { type TicketType } from "../../api/tickets"
import { ArrowRight, Copy, Checkmark } from "@carbon/icons-react"
import Avatar from "../../components/Avatar"
import capitalize from "../../utils/capitalize"
import useClipboard from "../../hooks/useClipboard"
import formatDate from "../../utils/formatDate"

type Props = {
  ticket: TicketType
}

const TicketBar: FC<Props> = ({ ticket }) => {
  const { copy, copied } = useClipboard()
  const navigate = useNavigate()

  return (
    <div className="ticketbar">
      <div className="id">
        { copied
          ? <Checkmark />
          : <Copy onClick={() => copy(ticket._id)} />
        }
        <p>{ ticket._id }</p>
      </div>
      <div className="user">
        <Avatar image={ticket.createdBy.avatar!} onClick={() => navigate("/users", { state: ticket.createdBy.name })} />
        <p>{ ticket.createdBy.name }</p>
      </div>
      <p className="subject">{ ticket.subject }</p>
      <p className={`status ${ticket.status}`}>{ capitalize(ticket.status) }</p>
      <div className="priority">
        <div className={ticket.priority}></div>
        <p>{ capitalize(ticket.priority) }</p>
      </div>
      <p className="date">{ formatDate(ticket.createdAt, "short") }</p>
      <ArrowRight onClick={() => navigate(`/tickets/${ticket._id}`) }/>
    </div>
  )
}

export default TicketBar