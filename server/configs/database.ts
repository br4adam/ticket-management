import mongoose from "mongoose"

const mongoUri = process.env.MONGO_URI as string

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri)
    console.log("Connected to database.")
  } catch (error) {
    console.log("Cannot connect to database.", error)
    process.exit(1)
  }
}

export default connectDB