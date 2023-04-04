import express, { Request, Response } from "express"
import mongoose from "mongoose"
import verifyToken from "../middlewares/verifyToken"
import { Company } from "../models/Company"
import { Ticket } from "../models/Ticket"
import { User } from "../models/User"

const router = express.Router()

router.get("/", async (req: Request, res: Response) => {
  const companies = await Company.find()
  res.status(200).json(companies)
})

router.get("/:id/tickets", verifyToken, async (req: Request, res: Response) => {
  const id = req.params.id
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(422).json("Please provide correct id.")
  const company = await Company.findById(id)
  if (!company) return res.status(404).json("Company not found.")
  const foundTickets = await Ticket.find({ company: id }).populate("createdBy").populate("company").populate("messages.user")
  res.status(200).json(foundTickets)
})

router.post("/", verifyToken, async (req: Request, res: Response) => {
  const { companyName } = req.body
  if (!companyName) res.status(400).json("Please add the name of the company.")
  const user = res.locals.user
  const foundCompany = await Company.findOne({ name: companyName })
  if (foundCompany) return res.status(409).json("This company is already listed in our system.")
  const newCompany = await Company.create({ name: companyName, admins: [ user._id ] })
  await User.findByIdAndUpdate(user._id, { company: newCompany._id })
  res.status(201).json(newCompany)
})

export default router