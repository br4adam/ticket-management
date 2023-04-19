import { useState } from "react"
import { useNavigate } from "react-router-dom"
import PriorityLevels from "./PriorityLevels"
import Select from "../../components/Select"
import useGlobal from "../../hooks/useGlobal"
import { user$ } from "../../states/user"
import { type NewTicketType, saveTicket } from "../../api/tickets"

const Create = () => {
  const user = useGlobal(user$)
  const initialData = { createdBy: user!._id, company: user!.company!._id, subject: "", description: "", status: "open", priority: "low" }
  const navigate = useNavigate()

  const [ ticketData, setTicketData ] = useState<NewTicketType>(initialData)
  const [ priority, setPriority ] = useState<string>("low")

  const createTicket = async () => {
    if (!ticketData.subject) return
    const { data } = await saveTicket({ ...ticketData, priority })
    setTicketData(initialData)
    navigate(`/tickets/${data}`)
  }

  return (
    <div className="create wrapper">
      <h1>Create Ticket</h1>
      <section className="select-elements">
        <Select options={[ "open", "pending", "closed" ]} disabled={true} def={"open"} />
        <Select options={[ "low", "medium", "high" ]} onSelect={setPriority} def={priority} />
      </section>
      <section className="new-form container">
      <div>
        <p>Subject</p>
        <input type="text" value={ticketData.subject} onChange={(e) => setTicketData({ ...ticketData, subject: e.target.value })} name="subject" placeholder="The subject of the ticket." />
      </div>
      <div>
        <p>Description</p>
        <textarea value={ticketData.description} onChange={(e) => setTicketData({ ...ticketData, description: e.target.value })} rows={4} name="description" placeholder="Type description here..." />
      </div>
      <button className="solid" onClick={createTicket}>Create Ticket</button>
    </section>
      <PriorityLevels />
    </div>
  )
}

export default Create