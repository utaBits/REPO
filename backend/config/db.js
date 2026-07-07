import pg from 'pg'
import dotenv from "dotenv"

dotenv.config()

const pool = new pg.Pool({
    user: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: 'Inventory',
    port: process.env.DB_PORT || 5432,
    password: process.env.DB_PASSWORD,
})

pool.on('connect' , (client) =>{
    client.query("SET client_encoding TO 'UTF8'")
})

export { pool }