import type { Shape } from "./Types";
import { shapeFromRows } from "./utils";

export type ItemConfig = {
    name: string;
    description: string;
    imgUrl: string;
    shape: Shape
}

export const ITEM_DATABASE: Record<string, ItemConfig> = {
    sword: {
        name: "Sword",
        description: "A sword",
        imgUrl: "/images/items/Longsword.png",
        shape: shapeFromRows([
            [true],
            [true],
            [true]
        ])
    }
}