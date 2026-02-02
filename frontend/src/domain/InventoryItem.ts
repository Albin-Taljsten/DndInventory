import * as types from "./Types";

export class InventoryItem {
    public id: string;
    public shape: types.Shape;

    constructor(id: string, shape: types.Shape) {
        this.id = id;
        this.shape = shape;
    }
}