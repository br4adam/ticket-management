import { request } from "./request"
import { z } from "zod"

export const CompanySchema = z.object({
  _id: z.string(),
  name: z.string(),
  admins: z.string().array()
})
export type CompanyType = z.infer<typeof CompanySchema>

const CompanyListSchema = CompanySchema.array()

export const getCompanies = async () => {
  const response = await request("get", "/api/companies", {}, CompanyListSchema)
  return response
}

export const createCompany = async (name: string) => {
  const response = await request("post", "/api/companies", { name }, CompanyListSchema)
  return response.data
}