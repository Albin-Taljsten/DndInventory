import { useInventory } from "../../hooks/useInventory";
import InventoryGrid from "../components/InventoryGrid";
import "../../scss/layouts/InventoryPage.scss"
import { newPoint } from "../../domain/Types";
import { InventoryItem } from "../../domain";

const GRID_WIDTH = 5;
const GRID_HEIGHT = 10;

export default function InventoryPage() {
    const {
        inventory,
        addItem,
        removeItem,
        moveItem,
        findFirstSpot,
        serialize,
        getGridSnapshot,
    } = useInventory(GRID_WIDTH, GRID_HEIGHT);

    const gridData = getGridSnapshot();

    const item: InventoryItem = new InventoryItem("Sword", [
        [true],
        [true],
        [true]
    ]);

    return (
        <div className="inventory-page">
            <h1>Inventory</h1>
            <InventoryGrid
                grid={gridData}
                onCellClick={(x, y) => {
                    console.log("Cell clicked:", x, y);
                    inventory.addItem(item, newPoint(x, y));
                }}
            />
        </div>
    )
}