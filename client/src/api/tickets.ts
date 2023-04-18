import { request } from "./request"
import { z } from "zod"
import { CompanySchema } from "./companies"

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
      _id: z.string(),
      name: z.string(),
      avatar: z.string()
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

const UpdateTicketSchema = z.object({
  priority: z.string().optional(),
  status: z.string().optional(),
})
export type UpdateTicketType = z.infer<typeof UpdateTicketSchema>

const MessageSchema = z.object({
  user: z.string(),
  message: z.string().min(1),
})
type MessageType = z.infer<typeof MessageSchema>

const TicketListSchema = TicketSchema.array()
const TicketIdSchema = z.string()

export const getTickets = async () => {
  const response = await request("get", "/api/tickets", {}, TicketListSchema)
  return response
}

export const getTicket = async (id: string) => {
  const response = await request("get", `/api/tickets/${id}`, {}, TicketSchema)
  return response
}

export const saveTicket = async (data: NewTicketType) => {
  const response = await request("post", "/api/tickets", data, TicketIdSchema)
  return response
}

export const updateTicket = async (id: string, data: UpdateTicketType) => {
  const response = await request("put", `/api/tickets/${id}`, data, TicketSchema)
  return response
}

export const sendMessage = async (id: string, data: MessageType) => {
  const response = await request("put", `/api/tickets/${id}/messages`, data, TicketSchema)
  return response
}