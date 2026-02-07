import type { FC } from "react";
import type { Cell } from "../../domain/Types";
import "../../scss/components/InventoryGrid.scss"

type Props = {
    grid: Cell[][];
    onCellClick?: (x: number, y: number) => void;
};

const InventoryGrid: FC<Props> = ({ grid, onCellClick }) => {
    return (
        <div className="inventory-grid">
            {grid.map((column, x) => 
                column.map((cell, y) => (
                    <div
                        key={`${x}-${y}`}
                        className={`cell ${cell.kind === "empty" ? "empty" : "occupied"}`}
                        onClick={() => onCellClick && onCellClick(x, y)}
                    >
                        {/* Optionally show item ID, icon, or rotation */}
                        {cell.kind === "occupied" ? cell.itemId : null}
                    </div>
                ))
            )}
        </div>
    );
};

export default InventoryGrid;