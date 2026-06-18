import express from "express"
import { pool } from "../config/db.js"

const router = express.Router()

router.get("/" , async (req,res) =>{
    const productNames = await pool.query('SELECT productname , id FROM Products')
    res.status(200).json(productNames.rows)
})

router.delete("/:productId" , async (req , res) => {
    const { productId } = req.params
    console.log(productId)
    try{
        const response = await pool.query("DELETE FROM Products WHERE id = $1",[productId])
    }catch(err){
        console.log(err)
    }
    res.status(200).send(`product Deleted wich id= ${productId}`)
})

router.post('/:productName' , async (req , res) => {
    const { productName } = req.params
    console.log(productName , 'new product')
    productName.trim() ?? console.log('product is not valid')
    try{
        await pool.query(`INSERT INTO Products (productname) VALUES ($1)`,[productName])
    }catch(err){
        console.log(err)
    }
})
export default router