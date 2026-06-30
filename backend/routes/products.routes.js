import express from "express"
import { pool } from "../config/db.js"

const router = express.Router()


router.get("/" , async (req,res) =>{
    const productNames = await pool.query('SELECT productname , id FROM Products')
    res.status(200).json(productNames.rows)
})

router.delete("/:productId" , async (req , res) => {
    const { productId } = req.params
    const tables = [ 'locally' , 'placemenets' , 'stock' ]

    const client = await pool.connect()

    try{
        await client.query("BEGIN")
        for(const table of tables){
            await client.query(`DELETE FROM ${table} WHERE product_id = $1`,[productId])
        }
         const response = await client.query("DELETE FROM Products WHERE id = $1",[productId])

         await client.query("COMMIT")
            return res.status(200).json({message: `product Deleted wich id= ${productId}`})
    }catch(err){
        await client.query("ROLLBACK")
        res.status(500).json({message: "Failed to delete product. Please delete the related operations first."})
        console.log(err)
    }finally{
        client.release()
    }
})

router.post('/:productName' , async (req , res) => {

    const tables = ['locally' , 'placemenets' , 'stock']

    const client = await pool.connect()

    const { productName } = req.params
    console.log(productName , 'new product')
    productName.trim() ?? console.log('product is not valid')
    try{

        await client.query("BEGIN")

        const response = await client.query(`INSERT INTO Products (productname) VALUES ($1) RETURNING id`,[productName])
        const newProductId = response.rows[0].id 
        console.log(newProductId)

    try{
        for(const table of tables){
            await client.query(`INSERT INTO ${table} (product_id) VALUES ($1)`,[newProductId])
            console.log(table)
        }
    }catch(err){
        console.log(err , 'cant to add id in tables')
    }
        await client.query("COMMIT")
        return res.status(200).send('product added successfully')
    }catch(err){
        await client.query("ROLLBACK")
        return res.status(500).send('failed to add new Product')
        console.log(err)
    }finally{
        client.release()
    }
})
export default router