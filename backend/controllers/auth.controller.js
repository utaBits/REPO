import { pool } from "../config/db.js"
import bcrypt from "bcrypt"
import { sendMail } from "../mailer.js"
import  jwt from "jsonwebtoken"


export const login = async (req ,res) =>{
     const { username , password } = req.body
     try{
     const result = await pool.query(
        "SELECT * FROM users WHERE username = $1", [username]
     )

      if (!result.rows.length) {
        return res.status(404).json({ success: false , message: "User not found" })
    }

     const user = result.rows[0]

    const isMatch = await bcrypt.compare(password, user.password)

     if (!isMatch) {
        return res.status(400).json({ success: false ,  message: "Wrong password" })
    }
        console.log(username)

        const userGmail = user.gmail

        console.log(userGmail)
          sendMail(userGmail)

    const token = jwt.sign(
        {
            userId: user.id,
            username: user.username
        },
        process.env.JWT_SECRET,
        {expiresIn: "1h"}
    )
    res.cookie("token", token, {
  httpOnly: true,
  secure: false,
  sameSite: "Lax"
});
    

    console.log(token)
    res.status(200).json({ success: true , message: "Login success", token })
}catch(err){console.error(err)}

}

export const otpValidate = async (req , res) =>{
    const { userOtp } = req.body
    console.log(userOtp)
    const token = req.headers.authorization
    const username = req.headers.username
    const response = await pool.query("SELECT otp FROM users WHERE username = $1",[username])
    const otp = response.rows[0].otp
    if(userOtp !== otp){
        return res.status(401).json({success: false , message: "wrong OTP" })
    }
    res.status(200).json({success: true , message: "login successfull" })
}