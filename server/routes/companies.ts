import express, { Request, Response } from "express"
import { z } from "zod"
import mongoose from "mongoose"
import verifySchema from "../middlewares/verifySchema"
import verifyToken from "../middlewares/verifyToken"
import { Company, CompanyType } from "../models/Company"
import { Ticket } from "../models/Ticket"
import { User } from "../models/User"

const router = express.Router()

const NewCompanySchema = z.object({
  name: z.string().min(3, { message: "Name must be 3 or more characters long" })
})
type NewCompanyType = z.infer<typeof NewCompanySchema> 

router.get("/", async (req: Request, res: Response) => {
  const companies = await Company.find()
  if (!companies) return res.sendStatus(400)
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

router.post("/", verifyToken, verifySchema(NewCompanySchema), async (req: Request, res: Response) => {
  const company = req.body as NewCompanyType
  const user = res.locals.user
  const foundCompany = await Company.findOne({ name: company.name })
  if (foundCompany) return res.status(409).json("This company is already listed in our system.")
  const newCompany = await Company.create<CompanyType>({ name: company.name, admins: [ user._id ] })
  await User.findByIdAndUpdate(user._id, { company: newCompany._id })
  res.status(201).json(newCompany)
})

export default router