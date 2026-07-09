import { pool } from "../config/db.js"
import bcrypt from "bcrypt"
import { sendMail } from "../mailer.js"
import  jwt from "jsonwebtoken"


export const login = async (req ,res) =>{
     const { username , password } = req.body
     console.log(username , password , 'is creds')
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
          await sendMail(userGmail)

    
    res.status(200).json({ success: true , message: "Login success",  username: user.username })
}catch(err){console.error(err)
    res.status(500).json({ success: false , message: "Internal server error" })
}
}

export const otpValidate = async (req , res) =>{
    const { userOtp } = req.body
    console.log(userOtp)

    const username = req.headers.username
    console.log(username , "from otp validate")
    const response = await pool.query("SELECT * FROM users WHERE username = $1",[username])
    console.log(response , "DBBBBB") ;
    const user = response.rows[0]
    const otp = user.otp
    console.log(otp , 'otp from db')
    if(userOtp !== otp){
        return res.status(400).json({success: false , message: "Invalid OTP"})
    }
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
  secure: true,
  sameSite: "none",
});
    

    console.log(token)
    res.status(200).json({success: true , message: "login successfull" })
}