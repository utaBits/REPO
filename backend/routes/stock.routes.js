import  express  from "express"
import { pool } from "../config/db.js"

const router = express.Router()

router.get("/" , async (req , res) =>{
    try{
    const stockData = await pool.query("SELECT productname , stock_quantity FROM stock JOIN products ON stock.product_id = products.id")
    res.status(200).json(stockData.rows)
    }catch(err){
        console.log(err)
    }
})
export default router