import express from "express"
import { addOperationInDom } from "../utills/helpers.js"
import { defineProductId } from "../utills/helpers.js"
import { pool } from "../config/db.js"

const router = express.Router()

router.get("/", async (req,res) => {
    const operations = await addOperationInDom();
    res.status(200).json(operations);
})
router.get('/all' , async (req,res) => {
    try{
    const allOperations = await pool.query("SELECT * FROM operations JOIN products ON operations.product_id = products.id")
    const sortedOperations = allOperations.rows.sort((a,b) => b.operation_id - a.operation_id)
    res.status(200).json(sortedOperations);
    }catch(err){
        console.error(err);
        res.status(500).json({message: "Internal server error"});
    }
})

router.put('/:opId' , async (req,res)=>{
    const { opId } = req.params
    const newData = req.body
    console.log(newData)
    const data = Object.entries(newData)
    const updateOp = `UPDATE operations SET ${data.map(([key , value])=> {return `${key} = '${value}'`})} WHERE operation_id = $1`
    console.log(updateOp)
    try{
    const resp = await pool.query(updateOp,[opId])
    res.status(200).send({ message: 'operation changed successfully' })
    }catch(err){
        res.status(500).send({ message: 'wtf is that?' })
        console.log(err)
    }
})

router.delete('/:opId' , async (req,res) =>{
    const { opId } = req.params
    try{
        await pool.query("DELETE FROM operations WHERE operation_id = $1",[opId])
        return res.status(204).send('operation delete successfully')
    }catch(err){
        console.log(err)
        return res.status(500).json({ message: 'operation not found OR internal Server Error' })
    }
})

router.post("/", async (req,res) => {
    const client = await pool.connect()
    console.log(req.body)


    try{
        const { opType , opStartDate, opStatus, opEndDate, opQTY , opDetailInfo , product} = req.body;
        const productId = await defineProductId(product);
        console.log(productId + " is the product id");

        await client.query("BEGIN")
        const result = await client.query("INSERT INTO Operations (product_id , start_date , operation_status , operation_type , quantity , end_date , additional_info) VALUES ($1 , $2 , $3 , $4 , $5 , $6 , $7) RETURNING *", [productId, opStartDate, opStatus, opType, opQTY, opEndDate, opDetailInfo]);


    switch(opType){        
        case "provision":
           await client.query("UPDATE stock SET stock_quantity = stock_quantity - $1 WHERE product_id = $2" , [opQTY , productId])
           await client.query("UPDATE locally SET locally_quantity = locally_quantity + $1 WHERE product_id = $2" , [opQTY , productId])
           break
        case "deinstall":
        case "takeFromVanue" :
            await client.query("UPDATE locally SET locally_quantity = locally_quantity + $1 WHERE product_id = $2" , [opQTY , productId])
            await client.query("UPDATE placemenets SET placed_quantity = placed_quantity - $1 WHERE product_id = $2", [opQTY , productId])
            break
        case "extraPlacement":
        case "placement" :
            await client.query("UPDATE placemenets SET placed_quantity = placed_quantity + $1 WHERE product_id = $2",[opQTY , productId])
            await client.query("UPDATE locally SET locally_quantity = locally_quantity - $1 WHERE product_id = $2",[opQTY , productId])
            break
        case "purchase":
           await client.query("UPDATE locally SET locally_quantity = locally_quantity + $1 WHERE product_id = $2" , [opQTY , productId])
           break
        default: throw new Error("invalid type")
    }
    await client.query("COMMIT")
    const insertedRow = result.rows[0]
    console.log(product + " is the product name");
    res.status(200).json({message: "operation added successfully"}) 

}catch(err){
    await client.query("ROLLBACK")
    throw err
}finally{
    client.release()
}
})


export default router