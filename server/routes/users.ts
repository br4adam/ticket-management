import express, { Request, Response } from "express"
import verifyToken from "../middlewares/verifyToken"
import { User } from "../models/User"

const router = express.Router()

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

router.put("/me", verifyToken, async (req: Request, res: Response) => {
  const userData = req.body
  const user = res.locals.user
  const updatedUser = await User.findByIdAndUpdate(user._id, { $set: { ...userData } }, { new: true })
  if (!updatedUser) return res.status(400).json("User not found.")
  res.status(200).json(updatedUser)
})

export default router