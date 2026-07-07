import app from "./app.js"
import pagesRoutes from "./routes/pages.routes.js"
import loginRouter from "./routes/auth.routes.js"
import dotenv from "dotenv"

dotenv.config()
const port = process.env.PORT
app.listen(port, /*"0.0.0.0",*/() => {console.log(`server running on port: ${port}`)})