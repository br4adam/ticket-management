import express, { Request, Response } from "express"
import { z } from "zod"
import verifyToken from "../middlewares/verifyToken"
import verifySchema from "../middlewares/verifySchema"
import { User } from "../models/User"
import { Company } from "../models/Company"
import jwt from "jsonwebtoken"

const router = express.Router()

const secretKey = process.env.JWT_SECRET_KEY
const expiresIn = process.env.TOKEN_EXPIRATION_TIME

const UserUpdateSchema = z.object({
  name: z.string().min(3).optional(),
  email: z.string().email().optional(),
  avatar: z.string().optional(),
  company: z.string().optional(),
  phone: z.string().min(6).max(14).optional(),
})
type UserUpdateType = z.infer<typeof UserUpdateSchema>

router.get("/", verifyToken, async (req: Request, res: Response) => {
  const user = res.locals.user
  const foundUser = await User.findById(user._id)
  if (!foundUser) return res.status(404).json("User not found.")
  const users = await User.find({ company: foundUser?.company }).populate("company")
  res.status(200).json(users)
})

router.get("/me", verifyToken, async (req: Request, res: Response) => {
  const user = res.locals.user
  const foundUser = await User.findById(user._id).populate("company")
  if (!foundUser) return res.sendStatus(404)
  res.status(200).json(foundUser)
})

router.put("/me", verifyToken, verifySchema(UserUpdateSchema), async (req: Request, res: Response) => {
  const userData = req.body as UserUpdateType
  const user = res.locals.user
  const updatedUser = await User.findByIdAndUpdate(user._id, { $set: { ...userData } }, { new: true }).select("-sub").populate("company").lean()
  if (!updatedUser) return res.sendStatus(404)
  const isAdmin = !!(updatedUser.company && await Company.exists({ _id: updatedUser.company._id, admins: updatedUser._id }))
  const sessionToken = jwt.sign({ ...updatedUser, isAdmin }, secretKey, { expiresIn })
  res.status(200).json(sessionToken)
})

export default router