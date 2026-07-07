import express from "express"
import{ pool } from "../config/db.js"

const router = express.Router()

router.get("/:filterName", async (req,res) => {
    const filterName = req.params.filterName;
    if(filterName === "productname"){
        const filterResult = await pool.query(`SELECT DISTINCT ${filterName} FROM Operations JOIN Products ON Operations.product_id = Products.id`)
        res.status(200).json(filterResult.rows)
    }else{
        const filterResult = await pool.query(`SELECT * FROM operations WHERE operation_status = $1`,[filterName]);
        res.status(200).json(filterResult.rows);
    }
})

router.get("/", async (req,res) => {
    console.log(req.query , 'fromfromfrom')
    const data = req.query
    const datta = Object.entries(data)
    console.log(datta , 'datttttta')
    const query = datta.map(([key , value]) => {return `${key} = '${value}'`})
    console.log(query)
    try{
    const filteredData = await pool.query('SELECT * FROM operations WHERE  ')
    }catch(err){
        console.log(err , 'while select data from db')
        res.status(500).json({ message: 'something was wrong when select filters from DB' })
    }
})


export default router