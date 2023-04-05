import { MongoMemoryServer } from "mongodb-memory-server"
import mongoose from "mongoose"

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

export { connect, disconnect, clear }