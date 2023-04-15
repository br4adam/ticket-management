import { BehaviorSubject } from "rxjs"
import jwt_decode from "jwt-decode"
import { z } from "zod"
import { login as loginRequest, updateUser } from "../api/users"

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

const decodeToken = (token: string | null): UserType | null => {
  if (!token) return null
  const decoded = jwt_decode(token)
  const result = UserSchema.safeParse(decoded)
  if (!result.success) return null
  return result.data
}

const user$ = new BehaviorSubject<UserType | null>(decodeToken(localStorage.getItem("token")))

const login = async (code: string) => {
  const token = await loginRequest(code)
  const user = decodeToken(token)
  if (!user) return
  user$.next(user)
  localStorage.setItem("token", token!)
}

const logout = () => {
  user$.next(null)
  localStorage.removeItem("token")
}

const update = async (data: UpdateType) => {
  const token = await updateUser(data)
  const user = decodeToken(token)
  if (!user) return
  user$.next(user)
  localStorage.setItem("token", token!)
}

export { user$, login, logout, update }