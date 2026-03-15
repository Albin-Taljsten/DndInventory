import type { Shape } from "./Types";
import { shapeFromRows } from "./utils";

export type ItemConfig = {
    name: string;
    description: string;
    imgUrl: string;
    shape: Shape;
}

export type ItemDB = Record<string, ItemConfig>;

export const ITEM_DATABASE: ItemDB = {
    longsword: {
        name: "Longsword",
        description: "A longsword",
        imgUrl: "/images/items/Longsword.png",
        shape: shapeFromRows([
            [true],
            [true],
            [true]
        ])
    },
    coal: {
        name: "Coal",
        description: "Pieces of coal",
        imgUrl: "/images/items/Coal.png",
        shape: shapeFromRows([
            [true]
        ])
    },
    gems: {
        name: "Gems",
        description: "An assortment of gems",
        imgUrl: "/images/items/Gems.png",
        shape: shapeFromRows([
            [true]
        ])
    },
    gold_coins: {
        name: "Gold Coins",
        description: "Good if threatened by the jews",
        imgUrl: "/images/items/Gold_Coins.png",
        shape: shapeFromRows([
            [true]
        ])
    },
    greatsword: {
        name: "Greatsword",
        description: "A greatsword",
        imgUrl: "/images/items/Greatsword.png",
        shape: shapeFromRows([
            [false, true, false],
            [false, true, false],
            [true, true, true],
            [false, true, false]
        ])
    },
    herbs: {
        name: "Herbs",
        description: "A bunch of herbs",
        imgUrl: "/images/items/Herbs.png",
        shape: shapeFromRows([
            [true]
        ])
    },
    mace: {
        name: "Mace",
        description: "A mace",
        imgUrl: "/images/items/Mace.png",
        shape: shapeFromRows([
            [true],
            [true],
            [true],
            [true]
        ])
    },
    ration: {
        name: "Ration",
        description: "Eat to stay healthy",
        imgUrl: "/images/items/Ration.png",
        shape: shapeFromRows([
            [true, true]
        ])
    },
    short_sword: {
        name: "Shortsword",
        description: "A Shortsword",
        imgUrl: "/images/items/Short_Sword.png",
        shape: shapeFromRows([
            [true],
            [true]
        ])
    }
}