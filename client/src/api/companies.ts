import { z } from "zod"

const baseUrl = import.meta.env.VITE_SERVER_URL

const CompanyResponseSchema = z.object({
  _id: z.string(),
  name: z.string(),
  admins: z.string().array()
}).array()

const getCompanies = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/companies`)
    const data = await response.json()
    const result = CompanyResponseSchema.safeParse(data)
    if (!result.success) return null
    return result.data
  } catch (error) {
    console.log(error)
    return null
  }
}

export { getCompanies }