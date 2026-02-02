// Type for a cell in the Grid
export type Cell = 
    | { kind: "empty"}
    | { kind: "occupied"; itemId: string };

// Type for a shape in the Grid
export type Shape = boolean[][];

// Type for a point (2D vector)
export type Point = {x: number, y: number}

// Helper class for types

export class typeHelper{

    // Helper functions for "Cell" type

    public static emptyCell(): Cell {
        return { kind: "empty" };
    }

    public static occupiedCell(itemId: string): Cell {
        return { kind: "occupied", itemId };
    }

    // Helper function(s) for "Point" type

    public static newPoint(x:number, y:number): Point
    {
        return {x, y}
    }
}