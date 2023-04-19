import dotenv from "dotenv"
dotenv.config()
import { z } from "zod"
import app from "./app"
import connectDB from "./configs/database"

const envSchema = z.object({
  PORT: z.string(),
  MONGO_URI: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_REDIRECT_URI: z.string(),
  JWT_SECRET_KEY: z.string()
})

envSchema.parse(process.env)

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}

const port = process.env.PORT

connectDB()

app.listen(port, () => console.log(`Listening on port ${port}.`))