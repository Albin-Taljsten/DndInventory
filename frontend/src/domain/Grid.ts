import { InventoryItem } from "./InventoryItem";
import { typeHelper, type Point, type Cell, type Shape } from "./Types";


/**
 * Represents the main inventory grid
 * 
 * @param width - Number of columns in the grid
 * @param height - Number of rows in the grid
 */
export class Grid {

    public width: number;
    public height: number;
    private cells: Cell[][];

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.cells = Array.from({ length: width }, () =>
            Array.from({ length: height }, () => typeHelper.emptyCell())
        );
    }

    /**
     * Gets a cell at the given coordinates
     * @param point - A point created with newPoint(x, y)
     * @returns The **Cell** with coordinates of **point**
     */
    getCell(point: Point): Cell {
        return this.cells[point.x][point.y];
    }

    /**
     * Sets a cell to a value of type **Cell**
     * @param point - A point created with newPoint(x, y)
     * @param value - A value with the typeof **Cell**, ex: types.typeHelper.occupiedCell("sword")
     */
    setCell(point: Point, value: Cell): void {
        this.cells[point.x][point.y] = value
    }

    /**
     * Checks if item can be placed in a specific spot
     * @param item - The item to be placed
     * @param x - Horizontal position to start checking
     * @param y - Vertical position to start checking
     * @returns **True** or **False**
     */
    canPlace(item: InventoryItem, point: Point): boolean {
        const shape = item.shape;
        for (let posX = 0; posX < shape.length; posX++) {
            for (let posY = 0; posY < shape[posX].length; posY++) {
                // Only checks spots that are true in the shape
                //**
                // Example: (T = true and . = false)
                // T T T
                // T T T
                // . T .
                //
                // Every T gets called but not the .'s
                //  */
                if (!shape[posX][posY]) continue;

                // Out of bounds check (if item is trying to be placed outside the grid)
                if (point.x + posX >= this.width || point.y + posY >= this.height) {
                    return false;
                }

                // Checks that all cells are empty where the item is to be placed if not returns false
                if (this.getCell(typeHelper.newPoint(point.x + posX, point.y + posY)).kind !== "empty") {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Places an item into the grid
     * @param item - Item to place into the grid
     * @param point - The point where the item will be placed into the grid
     * @returns **False** if item can't be placed, **True** otherwise
     */
    place(item: InventoryItem, point: Point): boolean {
        if(!this.canPlace(item, point)) return false;

        for (let posX = 0; posX < item.shape.length; posX++) {
            for (let posY = 0; posY < item.shape[posX].length; posY++) {
                if (item.shape[posX][posY]) {
                    this.setCell(typeHelper.newPoint(point.x + posX, point.y + posY), { kind: "occupied", itemId: item.id});
                }
            }
        }
        return true;
    }

    /**
     * Removes an existing item in the grid
     * @param item - Item to remove from the grid
     * @param point - Point where the item is in the grid
     */
    remove(item: InventoryItem): void {
        const idToRemove = item.id;

        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                const cell = this.getCell(typeHelper.newPoint(x, y));

                // If this cell belongs to the item, clear it
                if (cell.kind === "occupied" && cell.itemId === idToRemove) {
                    this.setCell(typeHelper.newPoint(x, y), { kind: "empty" });
                }
            }
        }
    }

    /**
     * Rotates an item 90 degrees in the clockwise direction
     * @param shape - The shape to rotate usually **item.shape**
     * @returns Resulting shape after getting rotated
     */
    static rotateShape(shape: Shape): Shape {
        const width = shape.length;
        const height = shape[0].length;
        const result: Shape = Array.from({ length: height }, () => [])

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                result[y][width - 1 - x] = shape[x][y];
            }
        }
        return result;
    }

    // Helper methods

    as2DArray(): Cell[][] {
        return this.cells
    }
}