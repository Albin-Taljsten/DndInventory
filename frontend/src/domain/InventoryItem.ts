import type { Shape } from "./Types";

export class InventoryItem {
    public id: string;
    public shape: Shape;

    constructor(id: string, shape: Shape) {
        this.id = id;
        this.shape = shape;
    }
}