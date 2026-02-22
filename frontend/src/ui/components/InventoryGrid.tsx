import type { Inventory } from "../../domain/Inventory";
import { newPoint, type Cell, type PlacedItem } from "../../domain/Types";
import "../../scss/components/InventoryGrid.scss";
import InventoryItem from "./InventoryItem";

interface InventoryGridProps {
    grid: Cell[][];
    inventory: Inventory;
    placements: PlacedItem[];
}

const InventoryGrid: React.FC<InventoryGridProps> = ({ grid, inventory, placements }) => {

    function handleCellClick(x: number, y: number) {
        const cell = grid[x][y];

        if (cell.kind === "occupied") return;

        const item = inventory.createItem("sword");

        const success = inventory.addItem(item, newPoint(x, y))

        if (!success) {
            console.log("Cannot place item at", x, y);
        }
    }

    return (
        <div className="inventory-grid">
                {grid[0].map((_, y) => (
                    <div key={y} className="inventory-row">
                        {grid.map((column, x) => {
                            const cell = column[y];
                            const className = 
                                cell.kind === "empty" ? "cell empty" : "cell occupied";

                            return (
                                <div 
                                    key={x} 
                                    className={className}
                                    onClick={() => handleCellClick(x, y)}
                                />
                            );
                        })}
                    </div>
                ))}

                {/* New overlay items */}
                {placements.map(placement => (
                    <InventoryItem
                        key={placement.item.id}
                        placement={placement}
                    />
                ))}
            </div>
    );
};

export default InventoryGrid;