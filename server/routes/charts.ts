import express, { Request, Response } from "express"
import mongoose from "mongoose"
import verifyToken from "../middlewares/verifyToken"
import { Ticket } from "../models/Ticket"
import { getDateBefore, getDates, formatDate } from "../utils/handleDates"

const router = express.Router()

const startDate = getDateBefore(6)
const datesArray = getDates(startDate, new Date())

router.get("/linechart", verifyToken, async (req: Request, res: Response) => {
  const user = res.locals.user

  let matchQuery: any = { createdBy: new mongoose.Types.ObjectId(user._id), updatedAt: { $gte: startDate }}
  if (user.isAdmin) matchQuery = { company: new mongoose.Types.ObjectId(user.company._id), updatedAt: { $gte: startDate }}

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

  const filledChartData = datesArray.map((date) => {
    const hasData = groupedTicketCounts.find(ticket => ticket.date === formatDate(date))
    return { date: formatDate(date), open: hasData ? hasData.open : 0, closed: hasData ? hasData.closed : 0, pending: hasData ? hasData.pending : 0 }
  })

  return res.status(200).json(filledChartData)
})

router.get("/barchart", verifyToken, async (req: Request, res: Response) => {
  const user = res.locals.user

  let matchQuery: any = { createdBy: new mongoose.Types.ObjectId(user._id), createdAt: { $gte: startDate }}
  if (user.isAdmin) matchQuery = { company: new mongoose.Types.ObjectId(user.company._id), createdAt: { $gte: startDate }}

  const newTicketCounts = await Ticket.aggregate()
    .match(matchQuery)
    .group({
      _id: { $dateToString: { date: "$createdAt", format: "%m.%d." }},
      count: { $sum: 1 }
    })
    .sort({ _id: 1 })
    .project({ date: "$_id", count: 1, _id: 0 })

  const filledChartData = datesArray.map((date) => {
    const hasData = newTicketCounts.find(ticket => ticket.date === formatDate(date))
    return { date: formatDate(date), count: hasData ? hasData.count : 0 }
  })

  return res.status(200).json(filledChartData)
})

router.get("/statistics", verifyToken, async (req: Request, res: Response) => {
  const user = res.locals.user

  let matchQuery: any = { createdBy: new mongoose.Types.ObjectId(user._id) }
  if (user.isAdmin) matchQuery = { company: new mongoose.Types.ObjectId(user.company._id) }

  const ticketCountsByStatus = await Ticket.aggregate()
    .match(matchQuery)
    .group({ _id: "$status", count: { $sum: 1 }})
    .match({ _id: { $in: ["open", "pending", "closed"] } })
    .project({ _id: 0, status: "$_id", count: 1 })

  const sum = ticketCountsByStatus.reduce((total, item) => total + item.count, 0)
  ticketCountsByStatus.push({ count: sum, status: "total" })

  const order = ["total", "open", "pending", "closed"]
  for (const status of order) {
    if (!ticketCountsByStatus.find((item) => item.status === status)) ticketCountsByStatus.push({ count: 0, status })
  }
  ticketCountsByStatus.sort((a, b) => order.indexOf(a.status) - order.indexOf(b.status))

  return res.status(200).json(ticketCountsByStatus)
})

export default router