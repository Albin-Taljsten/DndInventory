import { useCallback, useState } from "react";
import { Inventory } from "../domain/Inventory";
import type { Cell, Point } from "../domain/Types";
import type { InventoryItem } from "../domain";

export function useInventory(width: number, height: number) {
    // Create an Inventory instance once per hook
    const [inventory] = useState(() => new Inventory(width, height));

    const addItem = useCallback(
        (item: InventoryItem, origin: Point, rotation = 0) =>
            inventory.addItem(item, origin, rotation),
        [inventory]
    );

    const removeItem = useCallback(
        (itemId: string) => inventory.removeItem(itemId),
        [inventory]
    );

    const moveItem = useCallback(
        (itemId: string, newOrigin: Point) => 
            inventory.moveItem(itemId, newOrigin),
        [inventory]
    );

    const findFirstSpot = useCallback(
        (item: InventoryItem) => inventory.findFirstSpot(item),
        [inventory]
    );

    const serialize = useCallback(() => inventory.serialize(), [inventory]);

    const getGridSnapshot = useCallback((): Cell[][] => {
        return inventory.getGridSnapshot();
    }, [inventory]);

    return {
        inventory,
        addItem,
        removeItem,
        moveItem,
        findFirstSpot,
        serialize,
        getGridSnapshot,
    };
}