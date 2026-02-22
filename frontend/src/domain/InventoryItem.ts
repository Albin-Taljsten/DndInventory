import { ITEM_DATABASE } from "./itemDB";
import type { Shape } from "./Types";

export class InventoryItem {

    private _id: number;
    private _itemId: string;

    private _name: string;
    private _description: string;
    private _shape: Shape;

    constructor(id: number, itemId: string) {

        const config = ITEM_DATABASE[itemId];

        if (!config) {
            throw new Error(`Invalid itemId: ${itemId}`);
        }

        this._id = id;
        this._itemId = itemId;


        this._name = config.name;
        this._description = config.description;
        this._shape = config.shape;
    }

    // Getters
    get id() { return this._id; }
    get itemId() { return this._itemId }

    get name() { return this._name; }
    get description() { return this._description }
    get shape() { return this._shape; }
}