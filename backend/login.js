import bcrypt from "bcrypt"
import { pool } from "./app.js"
import dotenv from "dotenv"

dotenv.config()

const users = [
    { username: "tornikeeokropilashvilii" , password: process.env.tokosPass},
    { username: "temurrkiladzee" , password: process.env.temosPass},
    { username: "utruxunee" , password: process.env.utasPass}
]
for(let u of users){
    const hashedpass = await bcrypt.hash(u.password , 10)
        console.log(u.username , u.password)
     pool.query(
        `UPDATE users SET password = $1 WHERE username = $2`,[hashedpass , u.username]
    )
}
