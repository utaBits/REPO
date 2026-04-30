import express from "express"
import { login, otpValidate } from "../controllers/auth.controller.js"

const router = express.Router()


router.post("/login" , login)
router.post("/verify-otp" , otpValidate)

export default router