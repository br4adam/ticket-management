import { z } from "zod"

const safeParse = <T extends z.ZodTypeAny>(schema: T, data: unknown): z.infer<T> | null => {
  const result = schema.safeParse(data)
  if (!result.success) {
    console.log(result.error.issues)
    return null
  }
  return result.data
}

export default safeParse