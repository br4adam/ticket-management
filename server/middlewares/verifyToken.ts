import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

const secretKey = process.env.JWT_SECRET_KEY as string

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith("Bearer")) return res.status(401).json("Missing authorization.")
  
  const token = authHeader.split(" ")[1]
  try {
    const decoded = jwt.verify(token, secretKey) as jwt.JwtPayload
    res.locals.user = decoded
    res.locals.admin = decoded.company?.admins.some((id: string) => id === decoded._id)
    next()
  } catch (error) {
    console.log(error)
    return res.status(401).json("Authentication error.")
  }
}

export default verifyToken