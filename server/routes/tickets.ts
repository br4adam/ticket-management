import express, { Request, Response } from "express"
import { z } from "zod"
import mongoose from "mongoose"
import verifySchema from "../middlewares/verifySchema"
import verifyToken from "../middlewares/verifyToken"
import { Ticket, TicketType } from "../models/Ticket"

const { ObjectId } = mongoose.Types

const router = express.Router()

const MessageSchema = z.object({
  date: z.date().default(() => new Date()),
  user: z.string().transform((val) => new ObjectId(val)),
  message: z.string().min(1),
})
type MessageType = z.infer<typeof MessageSchema>

const TicketSchema = z.object({
  createdBy: z.string().transform((val) => new ObjectId(val)),
  subject: z.string(),
  company: z.string().transform((val) => new ObjectId(val)),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]).default("low"),
  status: z.enum(["open", "pending", "closed"]).default("open"),
  messages: z.array(MessageSchema).default([])
})
type NewTicketType = z.infer<typeof TicketSchema>

const TicketUpdateSchema = z.object({
  priority: z.enum(["low", "medium", "high"]).optional(),
  status: z.enum(["open", "pending", "closed"]).optional(),
})
type TicketUpdateType = z.infer<typeof TicketUpdateSchema>

router.get("/", verifyToken, async (req: Request, res: Response) => {
  const user = res.locals.user
  const limit = parseInt(req.query.limit as string) || 0
  const page = parseInt(req.query.page as string) || 1
  const skip = (page - 1) * limit

  let findQuery: any = { createdBy: user._id }
  if (user.isAdmin) findQuery = { company: user.company._id }
  const userTickets = await Ticket.find(findQuery).skip(skip).limit(limit).populate("createdBy").populate("company").populate({ path: "messages.user", select: "_id name avatar" }).sort({ createdAt: -1 })
  
  const totalCount = await Ticket.countDocuments(findQuery)
  const totalPages = Math.ceil(totalCount / limit)
  return res.status(200).json({ tickets: userTickets, page, totalPages, totalCount })
})

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  const id = req.params.id
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(422).json("Please provide correct id.")
  const foundTicket = await Ticket.findById(id).populate("createdBy").populate("company").populate(({ path: "messages.user", select: "_id name avatar" }))
  if (!foundTicket) return res.sendStatus(404)
  res.status(200).json(foundTicket)
})

router.post("/", verifyToken, verifySchema(TicketSchema), async (req: Request, res: Response) => {
  const data = req.body as NewTicketType
  const user = res.locals.user
  if (data.createdBy !== user._id) return res.sendStatus(403)
  const createdTicket = await Ticket.create<TicketType>(data)
  res.status(201).json(createdTicket._id)
})

router.put("/:id", verifyToken, verifySchema(TicketUpdateSchema), async (req: Request, res: Response) => {
  const id = req.params.id
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(422).json("Please provide correct id.")
  const data = req.body as TicketUpdateType
  const updatedTicket = await Ticket.findByIdAndUpdate(id, { $set: { ...data } }, { new: true }).populate("createdBy").populate("company").populate(({ path: "messages.user", select: "_id name avatar" }))
  if (!updatedTicket) return res.sendStatus(404)
  res.status(200).json(updatedTicket)
})

router.put("/:id/messages", verifyToken, verifySchema(MessageSchema), async (req: Request, res: Response) => {
  const id = req.params.id
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(422).json("Please provide correct id.")
  const user = res.locals.user
  if (req.body.user !== user._id) return res.sendStatus(403)
  const message = req.body as MessageType
  const updatedTicket = await Ticket.findByIdAndUpdate(id, { $push: { messages: message } }, { new: true }).populate("createdBy").populate("company").populate(({ path: "messages.user", select: "_id name avatar" }))
  if (!updatedTicket) return res.sendStatus(404)
  res.status(200).json(updatedTicket)
})

router.delete("/:id", verifyToken, async (req: Request, res: Response) => {
  const id = req.params.id
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(422).json("Please provide correct id.")
  const deletedTicket = await Ticket.findByIdAndDelete(id)
  if (!deletedTicket) return res.sendStatus(404)
  res.status(200).json("Ticket has been deleted successfully.")
})

export default router