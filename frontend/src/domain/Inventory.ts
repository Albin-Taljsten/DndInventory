import { Grid } from "./Grid";
import { InventoryItem } from "./InventoryItem";
import { newPoint, type Cell, type InventoryListener, type InventoryState, type PlacedItem, type Point } from "./Types";
import { computeOccupiedCells } from "./utils";

export class Inventory {
    private nextId = 0;

    private grid: Grid;
    private placements: Map<number, PlacedItem>;

    private listeners: Set<InventoryListener> = new Set();

    constructor(width: number, height: number) {
        this.grid = new Grid(width, height);
        this.placements = new Map();
    }

    /**
     * Subscribes a listener to inventory state changes.
     *
     * The listener will be called whenever the inventory changes,
     * such as when items are added, removed, moved, or when the
     * inventory is cleared.
     *
     * This is used by external systems (for example React hooks)
     * to react to inventory updates and refresh UI or synchronize state.
     *
     * @param listener - A callback function that will be invoked whenever
     * the inventory state changes. The current Inventory instance is passed
     * as an argument.
     *
     * @returns A function that unsubscribes the listener. This should be called
     * when the listener is no longer needed to prevent memory leaks.
     *
     * @example
     * const unsubscribe = inventory.subscribe(inv => {
     *     console.log("Inventory changed!");
     * });
     *
     * // Later when no longer needed:
     * unsubscribe();
     */
    subscribe(listener: InventoryListener): () => void {
        this.listeners.add(listener);

        // Returns the unsubscribe function (important)
        return () => {
            this.listeners.delete(listener);
        }
    }

    /**
     * Notifies all subscribed listeners that the inventory state has changed.
     *
     * This method is called internally after any operation that modifies
     * the inventory, such as adding, removing, moving, or clearing items.
     *
     * Each subscribed listener will be invoked with the current Inventory instance.
     *
     * This method should not be called externally. It exists to keep all
     * listeners synchronized with the inventory state.
     *
     * @internal
     */
    private notify(): void {
        for (const listener of this.listeners) {
            listener(this);
        }
    }

    createItem(itemId: string): InventoryItem {
        return new InventoryItem(this.nextId++, itemId);
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

        this.notify();
        
        return true;
    }

    /**
     * Removes an item from the inventory
     * @param itemId - The id of the item to be removed
     */
    removeItem(itemId: number): void {
        const placement = this.placements.get(itemId);
        if (!placement) return;


        this.grid.removeCells(placement.occupiedCells);
        this.placements.delete(itemId);

        this.notify();
    }

    /**
     * Moves an item to a now point in the inventory
     * @param itemId - The id of the item to be moved
     * @param newPoint - The new point of the moved item
     * @returns True if item got moved or tried to be moved, False if item doesn't exist
     */
    moveItem(itemId: number, newOrigin: Point): boolean {
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

        this.notify();

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

    /**
     * @returns A JSON ready InventoryState
     */
    serialize(): InventoryState {
        return {
            placements: Array.from(this.placements.values()).map(p => ({
                id: p.item.id,
                itemId: p.item.itemId,
                origin: p.origin,
                rotation: p.rotation,
            })),
        };
    }

    deserialize(state: InventoryState) {
        // Clear existing inventory
        this.clear();

        let maxId = -1;

        for (const p of state.placements) {
            const item = new InventoryItem(p.id, p.itemId);

            maxId = Math.max(maxId, item.id);

            this.placements.set(item.id, {
                item,
                origin: p.origin,
                rotation: p.rotation,
                occupiedCells: computeOccupiedCells(item.shape, p.origin),
            });

            this.grid.place(item, p.origin);
        }

        this.nextId = maxId + 1;

        this.notify();
    }

    setWidth(value: number) {
        this.grid.setWidth(value);
        this.notify();
    }

    setHeight(value: number) {
        this.grid.setHeight(value);
        this.notify();
    }

    /**
     * A snapshot of the grid used for debugging etc.
     * @returns 2DArray of the Grid
     */
    getGridSnapshot(): Cell[][] {
        return this.grid.as2DArray();
    }

    getPlacements(): PlacedItem[] {
        return Array.from(this.placements.values());
    }

    clear(): void {
        this.grid.clear();
        this.placements.clear();
        this.nextId = 0;
        this.notify();
    }

    debugPrint(): void {
        this.grid.debugPrint();
    }
}