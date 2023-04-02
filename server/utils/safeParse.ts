import { z } from "zod"

const safeParse = <T extends z.ZodTypeAny>(schema: T, data: unknown): z.infer<T> | null => {
  const result = schema.safeParse(data)
  if (result.success === false) {
    console.log(result.error)
    return null
  }
  return result.data
}

export default safeParse