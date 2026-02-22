import { useEffect, useRef, useState } from "react";
import { Inventory } from "../domain/Inventory";
import type { PlacedItem } from "../domain/Types";

export function useInventory(width: number, height: number) {
    const inventoryRef = useRef<Inventory | null>(null);

    if (inventoryRef.current === null) {
        inventoryRef.current = new Inventory(width, height);
    }

    const [grid, setGrid] = useState(
        inventoryRef.current.getGridSnapshot()
    );

    const [placements, setPlacements] = useState<PlacedItem[]>(
        inventoryRef.current.getPlacements()
    );

    useEffect(() => {
        const inventory = inventoryRef.current!;

        return inventory.subscribe(inv => {
            setGrid(inv.getGridSnapshot());
            setPlacements(inv.getPlacements());
        });
    }, []);

    return {
        inventory: inventoryRef.current!,
        grid,
        placements
    };
}