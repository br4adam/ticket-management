import { client, request } from "./request"
import { BehaviorSubject } from "rxjs"
import { z } from "zod"

export const UserSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string(),
  avatar: z.string().optional(),
  phone: z.string().min(6).max(14).optional(),
  company: z.object({
    _id: z.string(),
    name: z.string(),
    admins: z.string().array(),
  }).optional()
})
export type UserType = z.infer<typeof UserSchema>

export const UpdateSchema = z.object({
  avatar: z.string().optional(),
  phone: z.string().min(6).max(14).optional(),
  company: z.string().optional()
})
export type UpdateType = z.infer<typeof UpdateSchema>

const TokenSchema = z.string()

export const token$ = new BehaviorSubject<string | null>(localStorage.getItem("token"))

export const endSession = () => {
    localStorage.removeItem("token")
    token$.next(null)
}

export const login = async (code: string): Promise<string | null> => {
  try {
    const response = await client.post("/api/login", { code })
    const result = TokenSchema.safeParse(response.data)
    if (!result.success) return null
    const token = result.data
    token$.next(token)
    localStorage.setItem("token", token)
    return token
  } catch (err) {
    return null
  }
}

export const updateUser = async (data: UpdateType) => {
  const response = await request("put", "/api/users/me", data, TokenSchema)
  return response.data
}