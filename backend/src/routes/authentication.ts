import { Router } from "express";
import bcrypt from "bcrypt";
import { pool } from "../db";

const router = Router();

router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: "Username, email, and password are required" })
        }

        // Check for correct email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userResult = await pool.query(
            `INSERT INTO users (username, email, password_hash)
             VALUES ($1, $2, $3)
             RETURNING id, username, email`,
            [username, email, hashedPassword]
        );

        const user = userResult.rows[0];

        const emptyInventory = {
            placements: []
        };

        await pool.query(
            `INSERT INTO inventories (user_id, width, height, data)
             VALUES ($1, $2, $3, $4)`,
            [user.id, 5, 10, emptyInventory]
        );

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Registration failed" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const result = await pool.query(
            `SELECT * FROM users WHERE email = $1`,
            [email]
        );

        const user = result.rows[0];

        if(!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const valid = await bcrypt.compare(password, user.password_hash);

        if (!valid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const invResult = await pool.query(
            `SELECT * FROM inventories WHERE user_id = $1`,
            [user.id]
        );

        if (invResult.rows.length === 0) {
            const emptyInventory = { placements: [] };
            await pool.query(
                `INSERT INTO inventories (user_id, width, height, data)
                VALUES ($1, $2, $3, $4)`,
                [user.id, 5, 10, emptyInventory]
            );
        }

        res.json({
            id: user.id,
            username: user.username,
            email: user.email
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Login failed" });
    }
});

export default router;