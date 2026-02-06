import { Inventory } from "./Inventory";
import { InventoryItem } from "./InventoryItem";
import { newPoint } from "./Types";

export { Grid } from "./Grid";
export { InventoryItem } from "./InventoryItem"

export function test() {
    const inventory: Inventory = new Inventory(30, 30);

    const item1: InventoryItem = new InventoryItem("Sword", [
        [true],
        [true],
        [true],
        [true]
    ]);

    const item2: InventoryItem = new InventoryItem("Halbered", [
        [true, true],
        [true, true],
        [true, true],
        [true, true]
    ]);

    const item3: InventoryItem = new InventoryItem("Bow", [
        [true, true],
        [true, false],
        [true, true],
    ]);

    inventory.addItem(item1, newPoint(0, 0));
    inventory.addItem(item2, newPoint(6, 0));
    inventory.addItem(item3, newPoint(12, 0));

    console.log(inventory.getGridSnapshot());
}