import { FC } from "react"
import { TicketType } from "../../api/tickets"
import avatars from "../../assets/avatars"
import defaultAvatar from "../../assets/default-avatar.webp"
import { HiOutlineArrowRight, HiOutlineCheck } from "react-icons/hi"
import { RxCopy } from "react-icons/rx"
import Avatar from "../../components/Avatar"
import capitalize from "../../utils/capitalize"
import useClipboard from "../../hooks/useClipboard"
import formatDate from "../../utils/formatDate"

const TicketBar: FC<TicketType> = ( ticket ) => {
  const { copy, copied } = useClipboard()
  const avatar = avatars.find(a => a.includes(ticket.createdBy.avatar!)) || defaultAvatar

  return (
    <div className="ticketbar">
      <div className="id">
        { copied
          ? <HiOutlineCheck />
          : <RxCopy onClick={() => copy(ticket._id)} />
        }
        <p>{ ticket._id }</p>
      </div>
      <div className="user">
        <Avatar image={avatar} />
        <p>{ ticket.createdBy.name }</p>
      </div>
      <p className="subject">{ ticket.subject }</p>
      <p className={`status ${ticket.status}`}>{ capitalize(ticket.status) }</p>
      <div className="priority">
        <div className={ticket.priority}></div>
        <p>{ capitalize(ticket.priority) }</p>
      </div>
      <p className="date">{ formatDate(ticket.createdAt) }</p>
      <HiOutlineArrowRight />
    </div>
  )
}

export default TicketBar