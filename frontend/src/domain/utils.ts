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