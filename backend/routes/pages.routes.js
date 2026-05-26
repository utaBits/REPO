import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import { verifyToken } from "../middleware/auth.middleware.js"

const router = express.Router()


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)



router.get("/" , (req,res) => {
    res.redirect("/login")
})



/*
router.get("/dashboard" , verifyToken, (req , res) =>{
    res.sendFile(path.join(__dirname, ".." , ".." , 'frontend' , 'my-react-app' , 'main.html' ))
})
*/
router.get('/{*path}', (req , res) => {
    res.sendFile(path.join(__dirname , ".." , ".." , 'frontend' , 'my-react-app' , 'dist' , 'index.html'))
    
})
export default router