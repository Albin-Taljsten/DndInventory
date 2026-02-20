import type { Inventory } from "./Inventory";
import type { InventoryItem } from "./InventoryItem";

// Type for a cell in the Grid
export type Cell = 
    | { kind: "empty"}
    | { kind: "occupied"; itemId: string; };

// Type for a shape in the Grid
export type Shape = boolean[][];

// Type for a point (2D vector)
export type Point = {x: number, y: number}

//||===================================================||
type JsonPrimitive = string | number | boolean | null;
type JsonArray = JsonValue[];
type JsonObject = { [key: string]: JsonValue };

/**
 * A recursive JSON type that can be used to model JSON files
 * @deprecated FOR NOW
 */
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;

// Type for placed item metadata
export type PlacedItem = {
    item: InventoryItem;
    origin: Point;
    rotation: number;
    occupiedCells: Point[];
}

// Type for the state that the Inventory has
export type InventoryState = {
    placements: {
        id: string;         // Unique item ID
        origin: Point;      // Where it was placed
        rotation: number;   // Item rotation
    }[];
}

export type InventoryListener = (inventory: Inventory) => void;


// Helper class for types

export class typeHelper{

    // Helper functions for "Cell" type

    public static emptyCell(): Cell {
        return { kind: "empty" };
    }

    public static occupiedCell(itemId: string): Cell {
        return { kind: "occupied", itemId };
    }
}

// Helper function for functions that get used often

// Helper function(s) for "Point" type

export function newPoint(x:number, y:number): Point
{
    return {x, y};
}