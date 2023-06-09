import { useState, FormEvent, ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"
import PriorityLevels from "./PriorityLevels"
import Select from "../../components/Select"
import useGlobal from "../../hooks/useGlobal"
import { user$ } from "../../states/user"
import { type NewTicketType, saveTicket } from "../../api/tickets"
import { toast } from "react-hot-toast"
import { useTranslation } from "react-i18next"

const Create = () => {
  const user = useGlobal(user$)
  const initialData = { createdBy: user!._id, company: user!.company!._id, subject: "", description: "", status: "open", priority: "low" }
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [ ticketData, setTicketData ] = useState<NewTicketType>(initialData)
  const [ priority, setPriority ] = useState<string>("low")

  const onInputChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setTicketData({ ...ticketData, [name]: value })
  }

  const createTicket = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!ticketData.subject) return toast.error("Please fill all the fields before submitting!")
    const response = await saveTicket({ ...ticketData, priority })
    if (!response.success) return toast.error("Unable to create your ticket!")
    toast.success("Ticket created successfully!")
    setTicketData(initialData)
    navigate(`/tickets/${response.data}`)
  }

  return (
    <div className="create wrapper">
      <h1>{t("create.title")}</h1>
      <section className="select-elements">
        <Select options={[ "open", "pending", "closed" ]} disabled={true} def={"open"} />
        <Select options={[ "low", "medium", "high" ]} onSelect={setPriority} def={priority} />
      </section>
      <form className="container" onSubmit={createTicket}>
        <label>
          <span>{t("create.subject")}</span>
          <input type="text" value={ticketData.subject} onChange={onInputChange} name="subject" placeholder={t("create.subject-placeholder"!)} />
        </label>
        <label>
          <span>{t("create.description")}</span>
          <textarea value={ticketData.description} onChange={onInputChange} rows={4} name="description" placeholder={t("create.description-placeholder"!)}  />
        </label>
        <button className="solid" type="submit">{t("create.button")}</button>
      </form>
      <PriorityLevels />
    </div>
  )
}

export default Create