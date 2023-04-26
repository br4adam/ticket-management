import axios, { AxiosError } from "axios"
import { z } from "zod"
import { endSession } from "./users"

const client = axios.create({ 
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: { Authorization: `Bearer: ${localStorage.getItem("token")}` }
})

client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) config.headers["Authorization"] = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error)
)

type Completed<T> = {
  data: T
  status: number
  success: true
}

type Failed = {
  data: unknown
  status: number
  success: false
}

export type Response<T> = Completed<T> | Failed

const request = async <T extends z.ZodTypeAny>(method: string, url: string, payload: any, schema: T): Promise<Response<z.infer<T>>> => {
  try {
    const options = { method, url, data: payload }
    const response = await client.request(options)
    const result = schema.safeParse(response.data)
    if (result.success) return { data: result.data, status: response.status, success: true }
    else return { data: null, status: response.status, success: false }
  } catch (error) {
    const response = (error as AxiosError).response
    if (response?.status === 401) endSession()
    if (response) return { data: response.data, status: response.status, success: false }
    return { data: null, status: 0, success: false }
  }
}

export { client, request }