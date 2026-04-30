import express from 'express'
import authRoutes from "./routes/auth.routes.js"
import pagesRoutes from "./routes/pages.routes.js"
import path from "path"
import oprouter from "./routes/operations.routes.js"
import filterNameRouter from "./routes/filters.routes.js"
import productsRouter from "./routes/products.routes.js"
import cookieParser from 'cookie-parser'


const root = path.resolve("..")

const app = express()
app.use(cookieParser())
app.use("/" , pagesRoutes)

app.use(express.static(path.join(root, "frontend")))

app.use(express.json())
app.use(express.static("../public"))
app.use("/auth", authRoutes)
app.use("/operations", oprouter)
app.use("/filter", filterNameRouter )
app.use("/filterbyadaptive", filterNameRouter)
app.use("/operationadd" , oprouter)
app.use("/products", productsRouter)


export default app