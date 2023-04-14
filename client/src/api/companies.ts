import { z } from "zod"

const baseUrl = import.meta.env.VITE_SERVER_URL
const token = localStorage.getItem("token")

const CompanySchema = z.object({
  _id: z.string(),
  name: z.string(),
  admins: z.string().array()
})
export type CompanyType = z.infer<typeof CompanySchema>

const CompanyListSchema = CompanySchema.array()
type CompanyListType = z.infer<typeof CompanyListSchema>

const getCompanies = async (): Promise<CompanyListType | null> => {
  try {
    const response = await fetch(`${baseUrl}/api/companies`)
    const data = await response.json()
    const result = CompanyListSchema.safeParse(data)
    if (!result.success) return null
    return result.data
  } catch (error) {
    console.log(error)
    return null
  }
}

const createCompany = async (name: string): Promise<CompanyType | null> => {
  try {
    const response = await fetch(`${baseUrl}/api/companies`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ name })
    })
    const data = await response.json()
    const result = CompanySchema.safeParse(data)
    if (!result.success) return null
    return result.data
  } catch (error) {
    console.log(error)
    return null
  }
}

export { getCompanies, createCompany }