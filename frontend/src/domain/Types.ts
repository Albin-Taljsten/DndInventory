// Type for a cell in the Grid
export type Cell = 
    | { kind: "empty"}
    | { kind: "occupied"; itemId: string };


// Helper functions for types
// Helper functions for "Cell" type

export function emptyCell(): Cell {
    return { kind: "empty" };
}

export function occupiedCell(itemId: string): Cell {
    return { kind: "occupied", itemId };
}
