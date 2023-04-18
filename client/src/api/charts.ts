import { request } from "./request"
import { z } from "zod"

const StatisticListSchema = z.object({
  status: z.string(),
  count: z.number()
}).array()
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

export const getStatistics = async () => {
  const response = await request("get", "/api/charts/statistics", {}, StatisticListSchema)
  console.log(response)
  return response.data
}

export const getBarChartData = async () => {
  const response = await request("get", "/api/charts/barchart", {}, BarChartDataSchema)
  return response.data
}

export const getLineChartData = async () => {
  const response = await request("get", "/api/charts/linechart", {}, LineChartDataSchema)
  return response.data
}