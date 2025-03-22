const express = require('express');
const redis = require('redis');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

const pool = new Pool({
    user: 'food_user',
    host: process.env.DB_HOST,
    database: 'food_delivery',
    password: 'password',
    port: 5432
});

const redisClient = redis.createClient({ url: `redis://${process.env.REDIS_HOST}:6379` });
redisClient.connect();

app.post('/api/order', async (req, res) => {
    const { userId, foodItem } = req.body;
    try {
        const query = 'INSERT INTO orders (user_id, food_item) VALUES ($1, $2) RETURNING *';
        const result = await pool.query(query, [userId, foodItem]);
        
        await redisClient.set(`order:${result.rows[0].id}`, JSON.stringify(result.rows[0]));

        res.status(201).json({ success: true, order: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(5001, () => console.log('Order Service running on port 5001'));
