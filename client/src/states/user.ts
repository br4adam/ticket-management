import { BehaviorSubject } from "rxjs"
import jwt_decode from "jwt-decode"
import { z } from "zod"
import { login as loginRequest } from "../api/users"

const UserSchema = z.object({
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
type UserType = z.infer<typeof UserSchema>

const user$ = new BehaviorSubject<UserType | null>(null)

const login = async (code: string) => {
  const token = await loginRequest(code)
  if (!token) return
  const decoded = jwt_decode(token)
  const result = UserSchema.safeParse(decoded)
  if (!result.success) return console.log(result.error)
  user$.next(result.data)
  console.log(result.data)
  localStorage.setItem("token", token)
}

const logout = () => {
  user$.next(null)
  localStorage.removeItem("token")
}

export { user$, login, logout }