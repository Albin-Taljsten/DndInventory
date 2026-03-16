import type { Shape } from "./Types";
import { shapeFromRows } from "./utils";

type Rarity = {
    name: string;
    class: string;
}

export type ItemConfig = {
    name: string;
    description: string;
    imgUrl: string;
    shape: Shape;
    rarity: Rarity
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
        ]),
        rarity: {"name": "Common", "class": "common"}
    },
    coal: {
        name: "Coal",
        description: "Pieces of coal",
        imgUrl: "/images/items/Coal.png",
        shape: shapeFromRows([
            [true]
        ]),
        rarity: {"name": "Trash", "class": "trash"}
    },
    gems: {
        name: "Gems",
        description: "An assortment of gems",
        imgUrl: "/images/items/Gems.png",
        shape: shapeFromRows([
            [true]
        ]),
        rarity: {"name": "Rare", "class": "rare"}
    },
    gold_coins: {
        name: "Gold Coins",
        description: "Good if threatened by the jews",
        imgUrl: "/images/items/Gold_Coins.png",
        shape: shapeFromRows([
            [true]
        ]),
        rarity: {"name": "Common", "class": "common"}
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
        ]),
        rarity: {"name": "Uncommon", "class": "uncommon"}
    },
    herbs: {
        name: "Herbs",
        description: "A bunch of herbs",
        imgUrl: "/images/items/Herbs.png",
        shape: shapeFromRows([
            [true]
        ]),
        rarity: {"name": "Common", "class": "common"}
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
        ]),
        rarity: {"name": "Common", "class": "common"}
    },
    ration: {
        name: "Ration",
        description: "Eat to stay healthy",
        imgUrl: "/images/items/Ration.png",
        shape: shapeFromRows([
            [true, true]
        ]),
        rarity: {"name": "Common", "class": "common"}
    },
    short_sword: {
        name: "Shortsword",
        description: "A Shortsword",
        imgUrl: "/images/items/Short_Sword.png",
        shape: shapeFromRows([
            [true],
            [true]
        ]),
        rarity: {"name": "Common", "class": "common"}
    },
    apple: {
        name: "Apple",
        description: "An apple a day keeps the doctor away",
        imgUrl: "/images/items/Apple.png",
        shape: shapeFromRows([
            [true]
        ]),
        rarity: {"name": "Common", "class": "common"}
    },
    cheese: {
        name: "Cheese",
        description: "A cheesey experience",
        imgUrl: "/images/items/Cheese.png",
        shape: shapeFromRows([
            [true]
        ]),
        rarity: {"name": "Common", "class": "common"}
    },
    grape: {
        name: "Grape",
        description: "A grape plant",
        imgUrl: "/images/items/Grape.png",
        shape: shapeFromRows([
            [true]
        ]),
        rarity: {"name": "Common", "class": "common"}
    },
    onion: {
        name: "Onion",
        description: "An onion",
        imgUrl: "/images/items/Onion.png",
        shape: shapeFromRows([
            [true]
        ]),
        rarity: {"name": "Common", "class": "common"}
    },
    potion: {
        name: "Potion",
        description: "A potion but which one is it? Find out I suppose",
        imgUrl: "/images/items/Potion.png",
        shape: shapeFromRows([
            [true]
        ]),
        rarity: {"name": "Uncommon", "class": "uncommon"}
    },
    rapier: {
        name: "Rapier",
        description: "A rapier",
        imgUrl: "/images/items/Rapier.png",
        shape: shapeFromRows([
            [true],
            [true],
            [true]
        ]),
        rarity: {"name": "Common", "class": "common"}
    },
    rapierPlus1: {
        name: "Rapier+1",
        description: "A rapier but better",
        imgUrl: "/images/items/Rapier+1.png",
        shape: shapeFromRows([
            [true],
            [true],
            [true]
        ]),
        rarity: {"name": "Uncommon", "class": "uncommon"}
    },
    rapierPlus2: {
        name: "Rapier+2",
        description: "A rapier but even better",
        imgUrl: "/images/items/Rapier+2.png",
        shape: shapeFromRows([
            [true],
            [true],
            [true]
        ]),
        rarity: {"name": "Rare", "class": "rare"}
    },
    wine: {
        name: "Wine",
        description: "A bottle of wine",
        imgUrl: "/images/items/Wine.png",
        shape: shapeFromRows([
            [true],
            [true]
        ]),
        rarity: {"name": "Common", "class": "common"}
    },
    time_orb: {
        name: "Orb of time",
        description: "A mysterious time orb of power",
        imgUrl: "/images/items/Time_Orb.gif",
        shape: shapeFromRows([
            [true]
        ]),
        rarity: {"name": "Artifact", "class": "artifact"}
    }
}