import express from "express"
import { pool } from "../config/db.js"

const router = express.Router()

router.get("/" , async (req,res) =>{
    const productNames = await pool.query('SELECT productname FROM Products')
    res.status(200).json(productNames.rows)
})

export default router