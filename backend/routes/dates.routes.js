import express from "express"
import{ pool } from "../config/db.js"

const router = express.Router()
router.get('/' , async (req , res)=>{
    const dates = await pool.query("SELECT DISTINCT start_date FROM Operations")
    dates ? res.status(200).json(dates.rows) : res.status(500).send('something went wron in server')

})
export default router