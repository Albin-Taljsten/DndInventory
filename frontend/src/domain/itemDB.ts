import type { Shape } from "./Types";
import { shapeFromRows } from "./utils";

export type ItemConfig = {
    name: string;
    description: string;
    shape: Shape
}

export const ITEM_DATABASE: Record<string, ItemConfig> = {
    sword: {
        name: "Sword",
        description: "A sword",
        shape: shapeFromRows([
            [true, true],
            [true, true],
            [true, true]
        ])
    },

    halbered: {
        name: "Halbered",
        description: "A halbered",
        shape: [
            [true, true],
            [true, true],
            [true, true],
            [true, true]
        ]
    }
}