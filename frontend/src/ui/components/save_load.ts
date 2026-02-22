import axios from "axios";
import { HOST, PORT, setGRID_HEIGHT, setGRID_WIDTH } from "../../globalVariables";
import { Inventory } from "../../domain/Inventory";
import type { InventoryState } from "../../domain/Types";

export async function load(userId: number, inventory: Inventory) {
    const res = await axios.get(`http://${HOST}:${PORT}/inventory/${userId}`);

    if (!res.data) return;

    setGRID_WIDTH(res.data.width);
    setGRID_HEIGHT(res.data.height);

    inventory.deserialize(res.data.data);
}

export async function save(userId: number, inventoryData: InventoryState, width: number, height: number): Promise<void> {
    await axios.post(`http://${HOST}:${PORT}/inventory/save`, {
        userId: userId,
        width: width,
        height: height,
        data: inventoryData
    });
}