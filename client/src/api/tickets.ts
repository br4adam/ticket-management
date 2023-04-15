import { z } from "zod"
import { CompanySchema } from "./companies"

const baseUrl = import.meta.env.VITE_SERVER_URL
const token = localStorage.getItem("token")

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
  priority: z.string(),
  status: z.string(),
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

const TicketListListSchema = TicketSchema.array()
type TicketListType = z.infer<typeof TicketListListSchema>

const getTickets = async (): Promise<TicketType[] | null> => {
  try {
    const response = await fetch(`${baseUrl}/api/tickets`, {
      headers: { "Authorization": `Bearer ${token}` }})
    const data = await response.json()
    const result = TicketListListSchema.safeParse(data)
    if (!result.success) return null
    return result.data
  } catch (error) {
    console.log(error)
    return null
  }
}

export { getTickets }