import { useRef, useState } from "react";
import type { Inventory } from "../../domain/Inventory";
import { newPoint, type Cell, type PlacedItem } from "../../domain/Types";
import "../../scss/components/InventoryGrid.scss";
import InventoryItem from "./InventoryItem";
import { CELL_SIZE } from "../../globalVariables";

interface InventoryGridProps {
    grid: Cell[][];
    inventory: Inventory;
    placements: PlacedItem[];
    mode: "none" | "remove";
    onItemInspect: (itemKey: string) => void;
}

const InventoryGrid: React.FC<InventoryGridProps> = ({ grid, inventory, placements, mode, onItemInspect }) => {
    //Use states, refs and constants/variables
    const gridRef = useRef<HTMLDivElement>(null);

    const [dragging, setDragging] = useState<{
        id: number;
        offsetX: number;
        offsetY: number;
    } | null>(null);

    const [dragPos, setDragPos] = useState<{ x: number; y: number; } | null>(null);

    /* Used when removing an item from the inventory */
    function handleRemove(id: number) {
        if (mode !== "remove") return;
        inventory.removeItem(id);
    }

    /* Used when moving an item in the grid to a new place in the grid */
    const handleMouseDown = (placement: PlacedItem, cellX: number, cellY: number, e: React.MouseEvent) => {
        if (mode !== "none") return;
        e.stopPropagation();

        const rect = e.currentTarget.getBoundingClientRect();
        // Offset from exact click point
        const offsetX = e.clientX - rect.left + cellX * CELL_SIZE;
        const offsetY = e.clientY - rect.top + cellY * CELL_SIZE;

        setDragging({ id: placement.item.id, offsetX, offsetY });
        setDragPos({ x: e.clientX - offsetX, y: e.clientY - offsetY });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!dragging) return;
        setDragPos({ x: e.clientX - dragging.offsetX, y: e.clientY - dragging.offsetY });
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        if (!dragging || !gridRef.current) return;

        const gridRect = gridRef.current.getBoundingClientRect();
        const x = Math.floor((e.clientX - gridRect.left - dragging.offsetX) / CELL_SIZE);
        const y = Math.floor((e.clientY - gridRect.top - dragging.offsetY) / CELL_SIZE);

        inventory.moveItem(dragging.id, { x, y });

        setDragging(null);
        setDragPos(null);
    };

    /**
    * Used when an item is dropped to the grid from outside the grid instance. Ex: From the item selector 
    * also used when adding an item to the inventory
    * @param e The drag event that happens when someone drags something into the grid
    */
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    /**
    * Used when an item is dropped to the grid from outside the grid instance. Ex: From the item selector
    * 
    * Also used when adding an item to the inventory
    * @param e The drag event that happens when someone drags something into the grid
    */
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();

        if (!gridRef.current) return;

        const itemKey = e.dataTransfer.getData("itemKey");

        if (!itemKey) return;

        const gridRect = gridRef.current.getBoundingClientRect();

        const x = Math.floor((e.clientX - gridRect.left) / CELL_SIZE);
        const y = Math.floor((e.clientY - gridRect.top) / CELL_SIZE);

        const item = inventory.createItem(itemKey);
        const success = inventory.addItem(item, newPoint(x, y));

        if (!success) console.log("Cannot place item at", x, y);
    }


    return (
        <div 
            className={`inventory-grid`}
            ref={gridRef}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
                {/* Render cells */}
                {grid[0].map((_, y) => (
                    <div key={y} className="inventory-row">
                        {grid.map((_, x) => {
                            return (
                                <div 
                                    key={x} 
                                    className="cell"
                                />
                            );
                        })}
                    </div>
                ))}
                
                {/* Overlay items */}
                {placements.map(placement => {
                    const isDragging = dragging?.id === placement.item.id;
                    const styleOverride = isDragging && dragPos ? {
                        left: dragPos.x - gridRef.current!.getBoundingClientRect().left,
                        top: dragPos.y - gridRef.current!.getBoundingClientRect().top,
                        zIndex: 1000,
                    } : {};

                    return (
                        <InventoryItem
                            key={placement.item.id}
                            placement={placement}
                            mode={mode}
                            onClick={(_, __, e) => {
                                if (e.ctrlKey) {
                                    onItemInspect(placement.item.itemId);
                                    return;
                                }

                                handleRemove(placement.item.id)
                            }}
                            onMouseDown={handleMouseDown}
                            styleOverride={styleOverride}
                        />
                    );
                })}
            </div>
    );
};

export default InventoryGrid;