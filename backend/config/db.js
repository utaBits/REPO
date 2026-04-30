import pg from 'pg'
import dotenv from "dotenv"

dotenv.config()

const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Inventory',
    port: 5432,
    password: process.env.DB_PASSWORD,
})

pool.on('connect' , (client) =>{
    client.query("SET client_encoding TO 'UTF8'")
})

export { pool }