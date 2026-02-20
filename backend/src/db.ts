import { Pool } from "pg";

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

export async function testDBConnection() {
    try {
        const client = await pool.connect();
        console.log("Database connected");
        client.release();
    } catch (err) {
        console.error("Database connection failed", err);
        process.exit(1);
    }
}