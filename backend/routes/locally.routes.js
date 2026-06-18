import { pool } from '../config/db.js';
import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const response = await pool.query('SELECT productname , locally_quantity FROM locally JOIN products ON products.id = locally.product_id');
        res.status(200).json(response.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });

    }
}   );

export default router;