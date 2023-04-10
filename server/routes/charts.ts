import express, { Request, Response } from "express"
import verifyToken from "../middlewares/verifyToken"
import { Ticket } from "../models/Ticket"
import { Company } from "../models/Company"
import getDateBefore from "../utils/getDateBefore"

const router = express.Router()

router.get("/linechart", verifyToken, async (req: Request, res: Response) => {
  const user = res.locals.user
  const userCompany = await Company.findById(user.company).populate("admins")
  const isAdmin = userCompany?.admins.some(admin => admin._id.equals(user._id))
  const startDate = getDateBefore(7)

  let matchQuery: any = { createdBy: user._id, updatedAt: { $gte: startDate }}
  if (isAdmin) matchQuery = { company: userCompany?._id, updatedAt: { $gte: startDate }}

  const groupedTicketCounts = await Ticket.aggregate()
    .match(matchQuery)
    .group({
      _id: { status: "$status", date: { $dateToString: { date: "$updatedAt", format: "%m.%d." }}},
      count: { $sum: 1 }
    })
    .group({
      _id: "$_id.date",
      open: { $sum: { $cond: [{ $eq: ["$_id.status", "open"] }, "$count", 0] }},
      closed: { $sum: { $cond: [{ $eq: ["$_id.status", "closed"] }, "$count", 0] }},
      pending: { $sum: { $cond: [{ $eq: ["$_id.status", "pending"] }, "$count", 0] }}
    })
    .sort({ _id: 1 })
    .project({ date: "$_id", open: 1, closed: 1, pending: 1, _id: 0 })
  return res.status(200).json(groupedTicketCounts)
})

router.get("/barchart", verifyToken, async (req: Request, res: Response) => {
  const user = res.locals.user
  const userCompany = await Company.findById(user.company).populate("admins")
  const isAdmin = userCompany?.admins.some(admin => admin._id.equals(user._id))
  const startDate = getDateBefore(7)

  let matchQuery: any = { createdBy: user._id, createdAt: { $gte: startDate }}
  if (isAdmin) matchQuery = { company: userCompany?._id, createdAt: { $gte: startDate }}

  const newTicketCounts = await Ticket.aggregate()
    .match(matchQuery)
    .group({
      _id: { $dateToString: { date: "$createdAt", format: "%m.%d." }},
      count: { $sum: 1 }
    })
    .sort({ _id: 1 })
    .project({ date: "$_id", count: 1, _id: 0 })
  return res.status(200).json(newTicketCounts)
})

export default router