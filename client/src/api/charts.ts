import { z } from "zod"

const baseUrl = import.meta.env.VITE_SERVER_URL
const token = localStorage.getItem("token")

const StatisticSchema = z.object({
  status: z.string(),
  count: z.number()
})
type StatisticType = z.infer<typeof StatisticSchema>

const StatisticListSchema = StatisticSchema.array()
export type StatisticListType = z.infer<typeof StatisticListSchema>

const getStatistics = async (): Promise<StatisticType[] | null> => {
  try {
    const response = await fetch(`${baseUrl}/api/charts/statistics`, {
      headers: { "Authorization": `Bearer ${token}` }})
    const data = await response.json()
    const result = StatisticListSchema.safeParse(data)
    if (!result.success) return null
    return result.data
  } catch (error) {
    console.log(error)
    return null
  }
}

const getBarChartData = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/charts/barchart`, {
      headers: { "Authorization": `Bearer ${token}` }})
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
    return null
  }
}

const getLineChartData = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/charts/linechart`, {
      headers: { "Authorization": `Bearer ${token}` }})
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
    return null
  }
}

export { getStatistics, getBarChartData, getLineChartData }