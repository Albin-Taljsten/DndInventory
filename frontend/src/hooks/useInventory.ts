import { useEffect, useRef, useState } from "react";
import { Inventory } from "../domain/Inventory";
import type { PlacedItem } from "../domain/Types";

export function useInventory(width: number, height: number, externalListener?: (inv: Inventory) => void) {
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


        const unsubscribe = inventory.subscribe(inv => {
            setGrid(inv.getGridSnapshot());
            setPlacements(inv.getPlacements());

            if (externalListener) {
                externalListener(inv);
            }
        });

        return unsubscribe;
    }, [externalListener]);

    return {
        inventory: inventoryRef.current!,
        grid,
        placements
    };
}