import { Grid } from "./Grid";
import type { InventoryItem } from "./InventoryItem";
import { typeHelper, type Cell, type Point } from "./Types";

export class Inventory {
    private grid: Grid;
    private items: Map<string, InventoryItem>;

    constructor(width: number, height: number) {
        this.grid = new Grid(width, height);
        this.items = new Map();
    }

    /**
     * Adds an item into the inventory
     * @param item - The item to add
     * @param point - The point where the item should be added
     * @returns True if successfully placed, False otherwise
     */
    addItem(item: InventoryItem, point: Point): boolean {
        const placed = this.grid.place(item, typeHelper.newPoint(point.x, point.y))
        if (!placed) return false;

        this.items.set(item.id, item);
        return true;
    }

    /**
     * Removes an item from the inventory
     * @param itemId - The id of the item to be removed
     */
    removeItem(itemId: string): void {
        const item = this.items.get(itemId);
        if (!item) return;
        this.grid.remove(item);
        this.items.delete(itemId);
    }

    /**
     * Moves an item to a now point in the inventory
     * @param itemId - The id of the item to be moved
     * @param newPoint - The new point of the moved item
     * @returns True if item got moved or tried to be moved, False if item doesn't exist
     */
    moveItem(itemId: string, newPoint: Point) {
        const item = this.items.get(itemId);
        if (!item) return false;
        if (!this.grid.canPlace(item, newPoint)) return false;

        this.grid.remove(item);
        return this.addItem(item, newPoint);
    }

    /**
     * Finds the first point where and item can be placed
     * @param item - The item to check the inventory with
     * @returns The point where the item can be placed or null if no such point exists
     */
    findFirstSpot(item: InventoryItem): Point | null {
        for (let y = 0; y < this.grid.height; y++) {
            for (let x = 0; x < this.grid.width; x++) {
                if (this.grid.canPlace(item, typeHelper.newPoint(x, y))) {
                    return typeHelper.newPoint(x, y);
                }
            }
        }
        return null;
    }

    /**
     * A snapshot of the grid used for debugging etc.
     * @returns 2DArray of the Grid
     */
    getGridSnapshot(): Cell[][] {
        return this.grid.as2DArray();
    }
}