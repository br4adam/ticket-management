import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

const secretKey = process.env.JWT_SECRET_KEY as string

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization
    if (!authorizationHeader) return res.status(401).json("Missing authorization header.")
    
    const token = authorizationHeader.split(" ")[1]
    if (!token) return res.status(401).json("Missing token.")
  
    const decoded = jwt.verify(token, secretKey) as jwt.JwtPayload
    res.locals.user = decoded.data
  } catch (error) {
    console.log(error)
  }
  next()
}

export default verifyToken