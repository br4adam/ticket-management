import { ArrowRight } from "@carbon/icons-react"

const TicketHeader = () => {
  return (
    <div className="ticketheader">
      <div className="id">
        <p>Id</p>
      </div>
      <div className="user">
        <p>Name</p>
      </div>
      <p className="subject">Subject</p>
      <p className={"status"}>Status</p>
      <div className="priority">
        <p>Priority</p>
      </div>
      <p className="date">Created</p>
      <ArrowRight />
    </div>
  )
}

export default TicketHeader