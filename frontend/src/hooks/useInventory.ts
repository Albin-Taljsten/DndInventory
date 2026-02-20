import { useEffect, useRef, useState } from "react";
import { Inventory } from "../domain/Inventory";

export function useInventory(width: number, height: number) {
    const inventoryRef = useRef<Inventory | null>(null);

    if (inventoryRef.current === null) {
        inventoryRef.current = new Inventory(width, height);
    }

    const [grid, setGrid] = useState(
        inventoryRef.current.getGridSnapshot()
    );

    useEffect(() => {
        const inventory = inventoryRef.current!;

        return inventory.subscribe(inv => {
            setGrid(inv.getGridSnapshot());
        })
    }, []);

    return {
        inventory: inventoryRef.current!,
        grid,
    };
}