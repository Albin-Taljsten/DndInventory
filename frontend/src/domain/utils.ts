import { newPoint, type Point, type Shape } from "./Types";

export function computeOccupiedCells(shape: Shape, origin: Point): Point[] {
    const cells: Point[] = [];

    for(let px = 0; px < shape.length; px++) {
        for (let py = 0; py < shape[px].length; py++) {
            if (shape[px][py]) {
                cells.push(newPoint(origin.x + px, origin.y + py));
            }
        }
    }

    return cells;
}

export function shapeFromRows(rows: boolean[][]): boolean[][] {
    const height = rows.length;
    const width = rows[0].length;

    const result: boolean[][] = Array.from({ length: width }, () => []);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            result[x][y] = rows[y][x];
        }
    }

    return result;
}