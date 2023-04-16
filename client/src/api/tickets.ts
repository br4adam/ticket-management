import { z } from "zod"
import { CompanySchema } from "./companies"

const baseUrl = import.meta.env.VITE_SERVER_URL

const TicketSchema = z.object({
  _id: z.string(),
  company: CompanySchema,
  createdBy: z.object({
    _id: z.string(),
    name: z.string(),
    email: z.string(),
    avatar: z.string(),
    phone: z.string().optional(),
    company: z.string()
  }),
  priority: z.enum(["low", "medium", "high"]).default("low"),
  status: z.enum(["open", "pending", "closed"]).default("open"),
  subject: z.string(),
  description: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  messages: z.object({
    date: z.string(),
    message: z.string(),
    user: z.object({
      name: z.string(),
      _id: z.string()
    })
  }).array().optional()
})
export type TicketType = z.infer<typeof TicketSchema>

const NewTicketSchema = z.object({
  createdBy: z.string(),
  company: z.string(),
  subject: z.string(),
  description: z.string().optional(),
  priority: z.string().default("low"),
  status: z.string().default("open"),
})
export type NewTicketType = z.infer<typeof NewTicketSchema>

const TicketListListSchema = TicketSchema.array()

const getTickets = async (): Promise<TicketType[] | null> => {
  try {
    const response = await fetch(`${baseUrl}/api/tickets`, {
      headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }})
    const data = await response.json()
    const result = TicketListListSchema.safeParse(data)
    if (!result.success) return null
    return result.data
  } catch (error) {
    console.log(error)
    return null
  }
}

const saveTicket = async (ticketData: NewTicketType): Promise<string | null> => {
  try {
    const response = await fetch(`${baseUrl}/api/tickets`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}` },
      body: JSON.stringify(ticketData)
    })
    const data = await response.json()
    const result = z.string().safeParse(data)
    if (!result.success) return null
    return result.data
  } catch (error) {
    console.log(error)
    return null
  }
}

export { getTickets, saveTicket }