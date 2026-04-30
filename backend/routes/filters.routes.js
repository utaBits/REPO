import express from "express"
import{ pool } from "../config/db.js"

const router = express.Router()

router.get("/:filterName", async (req,res) => {
    const filterName = req.params.filterName;
    if(filterName === "productname"){
        const filterResult = await pool.query(`SELECT DISTINCT ${filterName} FROM Operations JOIN Products ON Operations.product_id = Products.id`)
        res.status(200).json(filterResult.rows)
    }else{
        const filterResult = await pool.query(`SELECT DISTINCT ${filterName}::text FROM Operations`);
        res.status(200).json(filterResult.rows);
    }
})

router.get("/", async (req,res) => {
    const map = {
        productname: "products.productname",
        operation_type: "operations.operation_type",
        start_date: "operations.start_date",
        operation_status: "operations.operation_status",
        quantity: "operations.quantity"
    }
    const fiters = Object.keys(req.query);
    const values = Object.values(req.query);
    
    const filterResult = await pool.query(`SELECT products.productname , operations.operation_type , operations.start_date , operations.operation_status , operations.quantity FROM Operations JOIN Products ON Operations.product_id = Products.id WHERE ${fiters.map((filter, index) => `${map[filter]} = $${index + 1}`).join(" AND ")}`, values);
    res.status(200).json(filterResult.rows);
    console.log(req.query , " is the query");
})


export default router