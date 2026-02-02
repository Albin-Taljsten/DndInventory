import * as types from "./Types";

export class Grid {
    public width: number;
    public height: number;
    private cells: types.Cell[][];

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.cells = Array.from({ length: width }, () =>
            Array.from({ length: height }, () => types.emptyCell())
        );
    }

    getCell(x: number, y: number): types.Cell {
        return this.cells[x][y];
    }

    setCell(x: number, y:number, value: types.Cell): void {
        this.cells[x][y] = value
    }
}