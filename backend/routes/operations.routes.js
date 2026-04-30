import express from "express"
import { addOperationInDom } from "../utills/helpers.js"
import { defineProductId } from "../utills/helpers.js"
import { pool } from "../config/db.js"

const router = express.Router()

router.get("/", async (req,res) => {
    const operations = await addOperationInDom();
    res.status(200).json(operations);
})

router.post("/", async (req,res) => {


    const { productName , startDate, operationStatus, operationType, quantity, endDate, additionalInfo} = req.body;
        const productId = await defineProductId(productName);
        console.log(productId + " is the product id");
     const result =  pool.query("INSERT INTO Operations (product_id , start_date , operation_status , operation_type , quantity , end_date , additional_info) VALUES ($1 , $2 , $3 , $4 , $5 , $6 , $7) RETURNING *", [productId, startDate, operationStatus, operationType, quantity, endDate, additionalInfo]);
     result.then((result) => {console.log(result.rows[0])})

    console.log(productName + " is the product name");

    res.status(200).json({message: "operation added successfully"})

    
})


export default router