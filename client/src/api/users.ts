import { z } from "zod"

const baseUrl = import.meta.env.VITE_SERVER_URL

const LoginResponseSchema = z.string()

const login = async (code: string): Promise<string | null> => {
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

export { login }