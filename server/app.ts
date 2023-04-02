import express, { Express } from "express"
import cors from "cors"

const app: Express = express()

app.use(cors())
app.use(express.json())

export default app