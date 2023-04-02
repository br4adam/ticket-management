import mongoose from "mongoose"

const mongoUri = process.env.MONGO_URI as string

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri)
    console.log("MongoDB connected.")
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

export default connectDB