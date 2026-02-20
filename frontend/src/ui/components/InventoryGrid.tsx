import type { Inventory } from "../../domain/Inventory";
import type { Cell } from "../../domain/Types";
import "../../scss/components/InventoryGrid.scss";

interface InventoryGridProps {
    grid: Cell[][];
    inventory: Inventory
}

const InventoryGrid: React.FC<InventoryGridProps> = ({ grid }) => {
    return (
        <div className="inventory-grid">
            {grid[0].map((_, y) => (
                <div key={y} className="inventory-row">
                    {grid.map((column, x) => {
                        const cell = column[y];
                        const className = 
                            cell.kind === "empty" ? "cell empty" : "cell occupied";

                        return <div key={x} className={className}></div>;
                    })}
                </div>
            ))}
        </div>
    );
};

export default InventoryGrid;