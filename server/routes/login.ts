import express, { Request, Response } from "express"
import { z } from "zod"
import jwt from "jsonwebtoken"
import getIdToken from "../api/google"
import safeParse from "../utils/safeParse"
import verifySchema from "../middlewares/verifySchema"
import { User, UserType } from "../models/User"
import { Company } from "../models/Company"

const router = express.Router()

const LoginRequestSchema = z.object ({
  code: z.string()
})
type LoginRequest = z.infer<typeof LoginRequestSchema> 

const PayloadSchema = z.object({
  sub: z.string(),
  name: z.string(),
  email: z.string().email(),
})

const secretKey = process.env.JWT_SECRET_KEY
const expiresIn = process.env.TOKEN_EXPIRATION_TIME

router.post('/', verifySchema(LoginRequestSchema), async (req: Request, res: Response) => {
  const loginRequest = req.body as LoginRequest
  const idToken = await getIdToken(loginRequest.code)
  if (!idToken) return res.sendStatus(401)

  const payload: unknown = jwt.decode(idToken)
  const result = safeParse(PayloadSchema, payload)
  if (!result) return res.sendStatus(500)
  
  const foundUser = await User.findOne({ sub: result.sub })
  if (!foundUser) await User.create<UserType>(result)
  
  const user = await User.findOne({ sub: result.sub }).select("-sub").populate("company").lean()
  if (!user) return res.sendStatus(404)

  const isAdmin = !!(user.company && await Company.exists({ _id: user.company._id, admins: user._id }))
  
  const sessionToken = jwt.sign({ ...user, isAdmin }, secretKey, { expiresIn })
  res.status(200).json(sessionToken) 
})

export default router