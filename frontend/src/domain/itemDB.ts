import type { Shape } from "./Types";
import { shapeFromRows } from "./utils";

export type Rarity = {
    name: string;
    class: string;
}

export type ItemConfig = {
    name: string;
    description: string;
    preview: string;
    imgUrl: string;
    shape: Shape;
    rarity: Rarity;
}

export type ItemDB = Record<string, ItemConfig>;

export const ITEM_DATABASE: ItemDB = {
    longsword: {
        name: "Longsword",
        description: "A longsword",
        preview: "A longsword",
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
        preview: "Pieces of coal",
        imgUrl: "/images/items/Coal.png",
        shape: shapeFromRows([
            [true]
        ]),
        rarity: {"name": "Trash", "class": "trash"}
    },
    gems: {
        name: "Gems",
        description: "An assortment of gems",
        preview: "An assortment of gems",
        imgUrl: "/images/items/Gems.png",
        shape: shapeFromRows([
            [true]
        ]),
        rarity: {"name": "Rare", "class": "rare"}
    },
    gold_coins: {
        name: "Gold Coins",
        description: "Good if threatened by the jews",
        preview: "Good if threatened by the jews",
        imgUrl: "/images/items/Gold_Coins.png",
        shape: shapeFromRows([
            [true]
        ]),
        rarity: {"name": "Common", "class": "common"}
    },
    greatsword: {
        name: "Greatsword",
        description: `A greatsword`,
        preview: "A greatsword",
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
        preview: "A bunch of herbs",
        imgUrl: "/images/items/Herbs.png",
        shape: shapeFromRows([
            [true]
        ]),
        rarity: {"name": "Common", "class": "common"}
    },
    mace: {
        name: "Mace",
        description: "A mace",
        preview: "A mace",
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
        preview: "Eat to stay healthy",
        imgUrl: "/images/items/Ration.png",
        shape: shapeFromRows([
            [true, true]
        ]),
        rarity: {"name": "Common", "class": "common"}
    },
    dagger: {
        name: "Dagger",
        description: "A Dagger",
        preview: "A Dagger",
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
        preview: "An apple a day keeps the doctor away",
        imgUrl: "/images/items/Apple.png",
        shape: shapeFromRows([
            [true]
        ]),
        rarity: {"name": "Common", "class": "common"}
    },
    cheese: {
        name: "Cheese",
        description: "A cheesey experience",
        preview: "A cheesey experience",
        imgUrl: "/images/items/Cheese.png",
        shape: shapeFromRows([
            [true]
        ]),
        rarity: {"name": "Common", "class": "common"}
    },
    grape: {
        name: "Grape",
        description: "A grape plant",
        preview: "A grape plant",
        imgUrl: "/images/items/Grape.png",
        shape: shapeFromRows([
            [true]
        ]),
        rarity: {"name": "Common", "class": "common"}
    },
    onion: {
        name: "Onion",
        description: "An onion",
        preview: "An onion",
        imgUrl: "/images/items/Onion.png",
        shape: shapeFromRows([
            [true]
        ]),
        rarity: {"name": "Common", "class": "common"}
    },
    potion: {
        name: "Potion",
        description: "A potion but which one is it? Find out I suppose",
        preview: "A potion but which one is it? Find out I suppose",
        imgUrl: "/images/items/Potion.png",
        shape: shapeFromRows([
            [true]
        ]),
        rarity: {"name": "Uncommon", "class": "uncommon"}
    },
    rapier: {
        name: "Rapier",
        description: "A rapier",
        preview: "A rapier",
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
        preview: "A uncommon rapier",
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
        description: "A rare rapier",
        preview: "A rare rapier",
        imgUrl: "/images/items/Rapier+2.png",
        shape: shapeFromRows([
            [true],
            [true],
            [true]
        ]),
        rarity: {"name": "Rare", "class": "rare"}
    },
    rapierPlus3: {
        name: "Rapier+3",
        description: "A epic rapier",
        preview: "A epic rapier",
        imgUrl: "/images/items/Rapier+3.webp",
        shape: shapeFromRows([
            [true],
            [true],
            [true]
        ]),
        rarity: {"name": "Epic", "class": "epic"}
    },
    wine: {
        name: "Wine",
        description: "A bottle of wine",
        preview: "A bottle of wine",
        imgUrl: "/images/items/Wine.png",
        shape: shapeFromRows([
            [true],
            [true]
        ]),
        rarity: {"name": "Common", "class": "common"}
    },
    time_orb: {
        name: "Orb of time",
        description: `While holding this orb, you can use an action to 
                        determine whether it is morning, 
                        afternoon, evening, or nighttime outside. 
                        This property functions only on the Material Plane.`,
        preview: "Time manipulating artefact",
        imgUrl: "/images/items/Time_Orb.gif",
        shape: shapeFromRows([
            [true]
        ]),
        rarity: {"name": "Artifact", "class": "artifact"}
    },
    mess_kit: {
        name: "Mess Kit",
        description: "A mess kit used for cooking",
        preview: "A mess kit used for cooking",
        imgUrl: "/images/items/Mess_kit.png",
        shape: shapeFromRows([
            [true, true]
        ]),
        rarity: {"name": "Common", "class": "common"}
    },
    halberd: {
        name: "Halberd",
        description: "A halberd",
        preview: "A halberd",
        imgUrl: "/images/items/Halberd.png",
        shape: shapeFromRows([
            [true],
            [true],
            [true],
            [true],
            [true],
            [true]
        ]),
        rarity: {"name": "Common", "class": "common"}
    },
    rags: {
        name: "Rags",
        description: "A bunch of rags",
        preview: "A bunch of rags",
        imgUrl: "/images/items/Rags.png",
        shape: shapeFromRows([
            [true]
        ]),
        rarity: {"name": "Common", "class": "common"}
    },
    shattered_mirror: {
        name: "Shattered Mirror",
        description: "A shattered mirror dagger",
        preview: "A shattered mirror dagger",
        imgUrl: "/images/items/Shattered_Mirror.webp",
        shape: shapeFromRows([
            [true],
            [true]
        ]),
        rarity: {"name": "Artifact", "class": "artifact"}
    }
}