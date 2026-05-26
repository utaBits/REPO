import mailer from "nodemailer"
import dotenv from "dotenv"
import { pool } from "./config/db.js"


dotenv.config()

//transporter is sender , wich we can create or give to function , already in use
const transporter = mailer.createTransport({
    service: "gmail",
    secure: false,
    auth:{
       user: process.env.GMAIL,
       pass: process.env.GPASS
    }
})

try{
    await transporter.verify()
        console.log("gmail transported")
}catch(err){
    console.error(err)
}

export async function sendMail(userGmail) {

    const randomNumber = Math.floor(100000 + Math.random() * 900000)

    await pool.query("UPDATE users SET otp = $1 WHERE gmail = $2",[randomNumber , userGmail])

    try{
    const info = await transporter.sendMail({
        from: process.env.GMAIL,
        to: userGmail,
        subject: "Verfication CODE:",
        html: `<b>${randomNumber}</b>`
    })
      console.log("Message sent: %s", info.messageId);
  // Preview URL is only available when using an Ethereal test account
}catch(err){
    console.error(err , "while sending message")
}
}