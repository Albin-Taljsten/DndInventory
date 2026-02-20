import { useInventory } from "../../hooks/useInventory";
import InventoryGrid from "../components/InventoryGrid";
import "../../scss/layouts/InventoryPage.scss";

const GRID_WIDTH = 5;
const GRID_HEIGHT = 10;

const InventoryPage: React.FC = () => {
    const { inventory, grid } = useInventory(GRID_WIDTH, GRID_HEIGHT);

    return (
        <div className="inventory-page">
            <h1 className="inventory-title">My Inventory</h1>

            {/* InventoryGrid receives the current grid and the Inventory instance */}
            <InventoryGrid grid={grid} inventory={inventory} />
        </div>
    )
}

export default InventoryPage;