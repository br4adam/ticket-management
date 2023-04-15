import { z } from "zod"

const baseUrl = import.meta.env.VITE_SERVER_URL

const StatisticSchema = z.object({
  status: z.string(),
  count: z.number()
})
type StatisticType = z.infer<typeof StatisticSchema>

const StatisticListSchema = StatisticSchema.array()
export type StatisticListType = z.infer<typeof StatisticListSchema>

const BarChartDataSchema = z.object({
  date: z.string(),
  count: z.number(),
}).array()
export type BarChartDataType = z.infer<typeof BarChartDataSchema>

const LineChartDataSchema = z.object({
  date: z.string(),
  open: z.number(),
  pending: z.number(),
  closed: z.number()
}).array()
export type LineChartDataType = z.infer<typeof LineChartDataSchema>

const getStatistics = async (): Promise<StatisticType[] | null> => {
  try {
    const response = await fetch(`${baseUrl}/api/charts/statistics`, {
      headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }})
    const data = await response.json()
    const result = StatisticListSchema.safeParse(data)
    if (!result.success) return null
    return result.data
  } catch (error) {
    console.log(error)
    return null
  }
}

const getBarChartData = async (): Promise<BarChartDataType | null> => {
  try {
    const response = await fetch(`${baseUrl}/api/charts/barchart`, {
      headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }})
    const data = await response.json()
    const result = BarChartDataSchema.safeParse(data)
    if (!result.success) return null
    return result.data
  } catch (error) {
    console.log(error)
    return null
  }
}

const getLineChartData = async (): Promise<LineChartDataType | null> => {
  try {
    const response = await fetch(`${baseUrl}/api/charts/linechart`, {
      headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }})
    const data = await response.json()
    const result = LineChartDataSchema.safeParse(data)
    if (!result.success) return null
    return result.data
  } catch (error) {
    console.log(error)
    return null
  }
}

export { getStatistics, getBarChartData, getLineChartData }