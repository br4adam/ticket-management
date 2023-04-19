import express, { Request, Response } from "express"
import { z } from "zod"
import verifyToken from "../middlewares/verifyToken"
import verifySchema from "../middlewares/verifySchema"
import { User } from "../models/User"
import jwt from "jsonwebtoken"

const router = express.Router()

const secretKey = process.env.JWT_SECRET_KEY

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
  if (!foundUser) return res.status(400).json("Users not found.")
  const users = await User.find({ company: foundUser?.company }).populate("company")
  res.status(200).json(users)
})

router.get("/me", verifyToken, async (req: Request, res: Response) => {
  const user = res.locals.user
  const foundUser = await User.findById(user._id).populate("company")
  if (!foundUser) return res.status(400).json("User not found.")
  res.status(200).json(foundUser)
})

router.put("/me", verifyToken, verifySchema(UserUpdateSchema), async (req: Request, res: Response) => {
  const userData = req.body as UserUpdateType
  const user = res.locals.user
  const updatedUser = await User.findByIdAndUpdate(user._id, { $set: { ...userData } }, { new: true }).select("-sub").populate("company").lean()
  if (!updatedUser) return res.status(400).json("User not found.")
  const sessionToken = jwt.sign(updatedUser, secretKey, { expiresIn: "2h" })
  res.status(200).json(sessionToken)
})

export default router