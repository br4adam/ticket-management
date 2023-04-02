import express, { Express } from "express"
import cors from "cors"

import login from "./routes/login"
import tickets from "./routes/tickets"
import users from "./routes/users"
import companies from "./routes/companies"

const app: Express = express()

app.use(cors())
app.use(express.json())

app.use("/api/login", login)
app.use("/api/tickets", tickets)
app.use("/api/tickets", users)
app.use("/api/tickets", companies)

export default app