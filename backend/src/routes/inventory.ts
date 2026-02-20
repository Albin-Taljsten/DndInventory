import { Router } from "express";
import { pool } from "../db";

const router = Router();

// Save inventory
router.post("/save", async (req, res) => {
    try {
        const { userId, width, height, data } = req.body;

        const result = await pool.query(
            `INSERT INTO inventories (user_id, width, height, data)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [userId, width, height, data]
        );

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to save inventory" });
    }
});

// Load inventory by user
router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        const result = await pool.query(
            `SELECT * FROM inventories WHERE user_id = $1`,
            [userId]
        );

        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to load inventory" });
    }
});

export default router;