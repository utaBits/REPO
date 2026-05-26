import express from 'express'
import authRoutes from "./routes/auth.routes.js"
import pagesRoutes from "./routes/pages.routes.js"
import path from "path"
import oprouter from "./routes/operations.routes.js"
import filterNameRouter from "./routes/filters.routes.js"
import productsRouter from "./routes/products.routes.js"
import cookieParser from 'cookie-parser'
import { fileURLToPath } from "url"
import  cors  from 'cors'
import datesRoutes from './routes/dates.routes.js'


const root = path.resolve("..")

const app = express()
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.join(
  __dirname,
  "../frontend/my-react-app/dist"
);

// serve dist
app.use(express.static(distPath));

app.use(cookieParser())



app.use(express.static(path.join(root, "frontend")))

app.use(express.json())
app.use(express.static("../public"))
app.use("/auth", authRoutes)
app.use("/operations", oprouter)
app.use("/filter", filterNameRouter )
app.use("/filterbyadaptive", filterNameRouter)
app.use("/operationadd" , oprouter)
app.use("/products", productsRouter)
app.use("/dates", datesRoutes)
app.use("/" , pagesRoutes)



export default app