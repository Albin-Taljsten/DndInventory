import type { Inventory } from "./domain/Inventory";

export const HOST = "localhost";
export const PORT = 3000;

export let GRID_WIDTH: number = 5;
export let GRID_HEIGHT: number = 10;

export function setGRID_WIDTH(value: number, inventory: Inventory) {
    GRID_WIDTH = value;
    inventory.setWidth(value);
}

export function setGRID_HEIGHT(value: number, inventory: Inventory) {
    GRID_HEIGHT = value;
    inventory.setHeight(value);
}