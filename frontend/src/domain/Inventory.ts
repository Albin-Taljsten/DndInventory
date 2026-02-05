import { Grid } from "./Grid";
import type { InventoryItem } from "./InventoryItem";
import { newPoint, type Cell, type InventoryState, type PlacedItem, type Point } from "./Types";
import { computeOccupiedCells } from "./utils";

export class Inventory {
    private grid: Grid;
    private placements: Map<string, PlacedItem>;

    constructor(width: number, height: number) {
        this.grid = new Grid(width, height);
        this.placements = new Map();
    }

    /**
     * Adds an item into the inventory
     * @param item - The item to add
     * @param point - The point where the item should be added
     * @returns True if successfully placed, False otherwise
     */
    addItem(item: InventoryItem, origin: Point, rotation=0): boolean {
        if (!this.grid.canPlace(item, origin)) return false;

        this.grid.place(item, origin);

        const occupied = computeOccupiedCells(item.shape, origin);

        this.placements.set(item.id, {
            item,
            origin,
            rotation,
            occupiedCells: occupied,
        });
        
        return true;
    }

    /**
     * Removes an item from the inventory
     * @param itemId - The id of the item to be removed
     */
    removeItem(itemId: string): void {
        const placement = this.placements.get(itemId);
        if (!placement) return;


        this.grid.removeCells(placement.occupiedCells);
        this.placements.delete(itemId);
    }

    /**
     * Moves an item to a now point in the inventory
     * @param itemId - The id of the item to be moved
     * @param newPoint - The new point of the moved item
     * @returns True if item got moved or tried to be moved, False if item doesn't exist
     */
    moveItem(itemId: string, newOrigin: Point): boolean {
        const placement = this.placements.get(itemId);
        if (!placement) return false;

        const { item, occupiedCells } = placement;

        if (!this.grid.canPlace(item, newOrigin)) {
            return false;
        }

        this.grid.removeCells(occupiedCells);

        this.grid.place(item, newOrigin);

        const newOccupied = computeOccupiedCells(item.shape, newOrigin);
        this.placements.set(itemId, {
            item,
            origin: newOrigin,
            rotation: placement.rotation,
            occupiedCells: newOccupied,
        });

        return true;
    }

    /**
     * Finds the first point where and item can be placed
     * @param item - The item to check the inventory with
     * @returns The point where the item can be placed or null if no such point exists
     */
    findFirstSpot(item: InventoryItem): Point | null {
        for (let y = 0; y < this.grid.height; y++) {
            for (let x = 0; x < this.grid.width; x++) {
                if (this.grid.canPlace(item, newPoint(x, y))) {
                    return newPoint(x, y);
                }
            }
        }
        return null;
    }

    serialize(): InventoryState {
        return {
            placements: Array.from(this.placements.values()).map(p => ({
                id: p.item.id,
                origin: p.origin,
                rotation: p.rotation,
            })),
        };
    }

    /**
     * A snapshot of the grid used for debugging etc.
     * @returns 2DArray of the Grid
     */
    getGridSnapshot(): Cell[][] {
        return this.grid.as2DArray();
    }
}