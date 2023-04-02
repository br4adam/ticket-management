import { Request, Response, NextFunction } from "express"
import { z } from "zod"
import safeParse from "../utils/safeParse"

const verifySchema = <Schema extends z.ZodTypeAny>(schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
  const result = safeParse(schema, req.body)
  if (!result) return res.sendStatus(400)
  next()
}

export default verifySchema