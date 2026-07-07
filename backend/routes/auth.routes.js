import express from "express"
import { login, otpValidate } from "../controllers/auth.controller.js"
import jwt  from "jsonwebtoken"
import  bcrypt  from "bcrypt"

const router = express.Router()


router.post("/login" , login)
router.post("/verify-otp" , otpValidate)
router.get("/token" , (req,res) => {
    const token = req.cookies.token
    if(!token) return res.status(401).json({success: false , message: "you dont have Token"})
    try{
    const decoded = jwt.verify(token , process.env.JWT_SECRET)
    if(decoded) return res.status(200).json({success: true , message: "you are authorized"})
    }catch(err){return res.status(403).json({success: false , message: "invalid Token"})}
})

export default router