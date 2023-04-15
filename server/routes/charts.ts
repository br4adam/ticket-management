import express, { Request, Response } from "express"
import verifyToken from "../middlewares/verifyToken"
import { Ticket } from "../models/Ticket"
import { Company } from "../models/Company"
import { getDateBefore, getDates, formatDate } from "../utils/handleDates"

const router = express.Router()

const startDate = getDateBefore(7)
const datesArray = getDates(startDate, new Date())

router.get("/linechart", verifyToken, async (req: Request, res: Response) => {
  const user = res.locals.user
  const userCompany = await Company.findById(user.company).populate("admins")
  const isAdmin = userCompany?.admins.some(admin => admin._id.equals(user._id))

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

  const filledChartData = datesArray.map((date) => {
    const hasData = groupedTicketCounts.find(ticket => ticket.date === formatDate(date))
    return { date: formatDate(date), open: hasData ? hasData.open : 0, closed: hasData ? hasData.closed : 0, pending: hasData ? hasData.pending : 0 }
  })

  return res.status(200).json(filledChartData)
})

router.get("/barchart", verifyToken, async (req: Request, res: Response) => {
  const user = res.locals.user
  const userCompany = await Company.findById(user.company).populate("admins")
  const isAdmin = userCompany?.admins.some(admin => admin._id.equals(user._id))

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

  const filledChartData = datesArray.map((date) => {
    const hasData = newTicketCounts.find(ticket => ticket.date === formatDate(date))
    return { date: formatDate(date), count: hasData ? hasData.count : 0 }
  })

  return res.status(200).json(filledChartData)
})

router.get("/statistics", verifyToken, async (req: Request, res: Response) => {
  const user = res.locals.user
  const userCompany = await Company.findById(user.company).populate("admins")
  const isAdmin = userCompany?.admins.some(admin => admin._id.equals(user._id))

  let matchQuery: any = { createdBy: user._id }
  if (isAdmin) matchQuery = { company: userCompany?._id }

  const ticketCountsByStatus = await Ticket.aggregate()
    .match(matchQuery)
    .group({ _id: "$status", count: { $sum: 1 }})
    .match({ _id: { $in: ["open", "pending", "closed"] } })
    .project({ _id: 0, status: "$_id", count: 1 })

  const total = ticketCountsByStatus.reduce((total, x) => total + x.count, 0)
  ticketCountsByStatus.push({ count: total, status: "total" })
  const order = ["total", "open", "pending", "closed"]
  const ticketCounts = ticketCountsByStatus.sort((a, b) => order.indexOf(a.status) - order.indexOf(b.status))

  return res.status(200).json(ticketCounts)
})

export default router