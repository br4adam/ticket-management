import { request } from "./request"
import { BehaviorSubject } from "rxjs"
import jwt_decode from "jwt-decode"
import { z } from "zod"

export const UserSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string().email(),
  avatar: z.string().optional(),
  phone: z.string().min(6).max(14).optional(),
  company: z.object({
    _id: z.string(),
    name: z.string(),
    admins: z.string().array(),
  }).optional(),
  isAdmin: z.boolean().optional()
})
export type UserType = z.infer<typeof UserSchema>

const UserListSchema = UserSchema.array()
export type UserListType = z.infer<typeof UserListSchema>

export const UpdateSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
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

let tokenTimeout: number | null = null
token$.subscribe((token) => {
  if (tokenTimeout) clearTimeout(tokenTimeout)
  if (!token) return
  const { exp } = jwt_decode(token) as any
  const expiredAt = exp * 1000 - Date.now()
  tokenTimeout = setTimeout(endSession, expiredAt)
})

export const login = async (code: string) => {
  const response = await request("post", "/api/login", { code }, TokenSchema)
  if (!response.success) return response
  const token = response.data
  token$.next(token)
  localStorage.setItem("token", token)
  return response
}

export const updateUser = async (data: UpdateType) => {
  const response = await request("put", "/api/users/me", data, TokenSchema)
  return response
}

export const getUser = async () => {
  const response = await request("get", "/api/users/me", {}, UserSchema)
  return response
}

export const getUsers = async () => {
  const response = await request("get", "/api/users", {}, UserListSchema)
  return response
}