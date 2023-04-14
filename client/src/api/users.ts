import { z } from "zod"
import { UserSchema, type UserType, type UpdateType } from "../states/user"

const baseUrl = import.meta.env.VITE_SERVER_URL
const token = localStorage.getItem("token")

const LoginResponseSchema = z.string()

const login = async (code: string ): Promise<string | null> => {
  try {
    const response = await fetch(`${baseUrl}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code })
    })
    const data = await response.json()
    const result = LoginResponseSchema.safeParse(data)
    if (!result.success) return null
    return result.data
  } catch (error) {
    console.log(error)
    return null
  }
}

const updateUser = async (updateData: UpdateType): Promise<UserType | null> => {
  try {
    const response = await fetch(`${baseUrl}/api/users/me`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` },
      body: JSON.stringify(updateData)
    })
    const data = await response.json()
    const result = UserSchema.safeParse(data)
    if (!result.success) return null
    return result.data
  } catch (error) {
    console.log(error)
    return null
  }
}

export { login, updateUser }