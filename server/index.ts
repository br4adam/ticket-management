import dotenv from "dotenv"
dotenv.config()
import app from "./app"
import connectDB from "./configs/database"

const port = process.env.PORT

connectDB()

app.listen(port, () => console.log(`Listening on port ${port}.`))