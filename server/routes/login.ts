import express, { Request, Response } from "express"
import { z } from "zod"
import jwt from "jsonwebtoken"
import getIdToken from "../api/google"
import safeParse from "../utils/safeParse"
import verifySchema from "../middlewares/verifySchema"
import { User } from "../models/User"

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
type Payload = z.infer<typeof PayloadSchema>

const secretKey = process.env.JWT_SECRET_KEY
if (!secretKey) throw new Error ("Secret key is required.")

router.post('/', verifySchema(LoginRequestSchema), async (req: Request, res: Response) => {
  const loginRequest = req.body as LoginRequest
  const idToken = await getIdToken(loginRequest.code)
  if (!idToken) return res.sendStatus(401)

  const payload: unknown = jwt.decode(idToken)
  const result = safeParse(PayloadSchema, payload)
  if (!result) return res.sendStatus(500)
  
  const data: Payload = result
  const foundUser = await User.findOne({ sub: data.sub })
  if (!foundUser) await User.create(data)
  
  const user = await User.findOne({ sub: data.sub })
  if (!user) return res.sendStatus(500)
  
  const sessionToken = jwt.sign(user, secretKey)
  res.json(sessionToken) 
})

export default router