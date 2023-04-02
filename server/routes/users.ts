import express, { Request, Response } from "express"
import verifyToken from "../middlewares/verifyToken"
import { User } from "../models/User"

const router = express.Router()

router.get("/", verifyToken, async (req: Request, res: Response) => {
  if (!res.locals.user) return res.status(401).json("User not found.")
  const users = await User.find()
  res.json(users)
})

router.get("/me", verifyToken, async (req: Request, res: Response) => {
  const userId = req.body
  if (!res.locals.user || res.locals.user._id !== userId) return res.status(401).json("User not found.")
  const foundUser = await User.findById(userId)
  if (!foundUser) return res.status(404).json("User not found.")
  res.json(foundUser)
})

router.patch("/me", verifyToken, async (req: Request, res: Response) => {
  const { userId, userData } = req.body
  if (!res.locals.user || res.locals.user._id !== userId) return res.status(401).json("User not found.")
  const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true })
  if (!updatedUser) return res.status(404).json("User not found.")
  res.json(updatedUser)
})

export default router