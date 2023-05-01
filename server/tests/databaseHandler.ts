import { MongoMemoryServer } from "mongodb-memory-server"
import mongoose from "mongoose"
import { User } from "../models/User"
import { Company } from "../models/Company"
import jwt from "jsonwebtoken"
const secretKey = process.env.JWT_SECRET_KEY as string

let mongoServer: MongoMemoryServer

const connect = async () => {
  mongoServer = await MongoMemoryServer.create()
  const mongoUri = mongoServer.getUri()
  await mongoose.connect(mongoUri)
}

const disconnect = async () => {
  await mongoServer.stop()
  await mongoose.disconnect()
}

const clear = async () => {
  const collections = mongoose.connection.collections
  for (const key in collections) {
    await collections[key].deleteMany()
  }
}

const createUser = async () => {
  const company = await Company.create({ name: "Test Company" })
  const user = await User.create({ sub: "1234", name: "User", email: "user@test.com", company: company._id })
  const token = jwt.sign(user.toJSON(), secretKey)
  return { company, user, token }
}

export { connect, disconnect, clear, createUser }