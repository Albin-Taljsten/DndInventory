import dotenv from "dotenv";
import express from "express";
import cors from "cors";
dotenv.config();

import { testDBConnection } from "./db";
import inventoryRouter from "./routes/inventory";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/inventory", inventoryRouter);

app.get("/", (req, res) => {
    res.json({ message: "DND Inventory API running" });
});

async function startServer() {
    await testDBConnection();

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

startServer();