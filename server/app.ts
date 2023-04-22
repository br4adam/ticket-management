import express, { Express } from "express"
import cors from "cors"
import swaggerUi from "swagger-ui-express"
import YAML from "yamljs"

import login from "./routes/login"
import tickets from "./routes/tickets"
import users from "./routes/users"
import companies from "./routes/companies"
import charts from "./routes/charts"

const app: Express = express()

app.use(cors())
app.use(express.json())

app.use("/api/login", login)
app.use("/api/tickets", tickets)
app.use("/api/users", users)
app.use("/api/companies", companies)
app.use("/api/charts", charts)

const swaggerDocument = YAML.load("./swagger.yml") 
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

export default app