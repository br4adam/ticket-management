import express, { Request, Response } from "express"
import mongoose from "mongoose"
import verifySchema from "../middlewares/verifySchema"
import verifyToken from "../middlewares/verifyToken"
import { Ticket, TicketType } from "../models/Ticket"
import { Company } from "../models/Company"
import { z } from "zod"

const { ObjectId } = mongoose.Types

const router = express.Router()

const MessageSchema = z.object({
  date: z.date().default(() => new Date()),
  user: z.string().transform((val) => new ObjectId(val)),
  message: z.string(),
})
type MessageType = z.infer<typeof MessageSchema>

const TicketSchema = z.object({
  createdBy: z.string().transform((val) => new ObjectId(val)),
  subject: z.string(),
  company: z.string().transform((val) => new ObjectId(val)),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]).default("low"),
  status: z.enum(["open", "pending", "closed"]).default("open"),
  messages: z.array(MessageSchema).default([]),
  createdAt: z.date().optional(), 
  updatedAt: z.date().optional(), 
})
type NewTicketType = z.infer<typeof TicketSchema>

router.get("/", verifyToken, async (req: Request, res: Response) => {
  const user = res.locals.user
  const userCompany = await Company.findById(user.company).populate("admins")
  const isAdmin = userCompany?.admins.some(admin => admin._id.equals(user._id))
  if (isAdmin) {
    const companyTickets = await Ticket.find({ company: userCompany?._id }).populate("createdBy").populate("company").populate("messages.user")
    if (!companyTickets) return res.status(400).json("Tickets not found.")
    return res.status(200).json(companyTickets)
  }
  else {
    const foundTickets = await Ticket.find({ createdBy: user._id }).populate("createdBy").populate("company").populate("messages.user")
    if (!foundTickets) return res.status(400).json("Tickets not found.")
    return res.status(200).json(foundTickets)
  }
})

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  const id = req.params.id
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(422).json("Please provide correct id.")
  const foundTicket = await Ticket.findById(id).populate("createdBy").populate("company").populate("messages.user")
  if (!foundTicket) return res.status(404).json(`Ticket ${id} not found.`)
  res.status(200).json(foundTicket)
})

router.post("/", verifySchema(TicketSchema), verifyToken, async (req: Request, res: Response) => {
  const data = req.body as NewTicketType
  const newTicket = await Ticket.create<TicketType>(data)
  res.status(201).json(newTicket)
})

router.put("/:id", verifyToken, async (req: Request, res: Response) => {
  const id = req.params.id
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(422).json("Please provide correct id.")
  const data = req.body
  const updatedTicket = await Ticket.findByIdAndUpdate(id, { $set: { ...data } }, { new: true })
  if (!updatedTicket) return res.status(404).json(`Ticket ${id} not found.`)
  res.status(200).json(updatedTicket)
})

router.put("/:id/messages", verifySchema(MessageSchema), verifyToken, async (req: Request, res: Response) => {
  const id = req.params.id
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(422).json("Please provide correct id.")
  const user = res.locals.user
  if (req.body.user !== user._id) return res.sendStatus(401)
  const message = req.body as MessageType
  const updatedTicket = await Ticket.findByIdAndUpdate(id, { $push: { messages: message } }, { new: true })
  if (!updatedTicket) return res.status(404).json(`Ticket ${id} not found.`)
  res.status(200).json(updatedTicket)
})

router.delete("/:id", verifyToken, async (req: Request, res: Response) => {
  const id = req.params.id
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(422).json("Please provide correct id.")
  const deletedTicket = await Ticket.findByIdAndDelete(id)
  if (!deletedTicket) return res.status(404).json(`Ticket ${id} not found.`)
  res.status(200).json(deletedTicket)
})

export default router