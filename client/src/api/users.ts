import { z } from "zod"

const baseUrl = import.meta.env.VITE_SERVER_URL

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

const login = async (code: string ): Promise<string | null> => {
  try {
    const response = await fetch(`${baseUrl}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code })
    })
    const data = await response.json()
    const result = TokenSchema.safeParse(data)
    if (!result.success) return null
    return result.data
  } catch (error) {
    console.log(error)
    return null
  }
}

const updateUser = async (updateData: UpdateType): Promise<string | null> => {
  try {
    const response = await fetch(`${baseUrl}/api/users/me`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}` },
      body: JSON.stringify(updateData)
    })
    const data = await response.json()
    const result = TokenSchema.safeParse(data)
    if (!result.success) return null
    return result.data
  } catch (error) {
    console.log(error)
    return null
  }
}

export { login, updateUser }