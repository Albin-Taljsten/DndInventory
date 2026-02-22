import { useInventory } from "../../hooks/useInventory";
import InventoryGrid from "../components/InventoryGrid";
import "../../scss/layouts/InventoryPage.scss";
import { GRID_HEIGHT, GRID_WIDTH } from "../../globalVariables";
import SaveInventoryButton from "../components/SaveInventoryButton";
import LoadInventoryButton from "../components/LoadInventoryButton";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { load } from "../components/save_load";

const InventoryPage: React.FC = () => {
    const { inventory, grid, placements } = useInventory(GRID_WIDTH, GRID_HEIGHT);
    const { userId, setUserId } = useAuth();

    useEffect(() => {
        if (userId) load(userId, inventory);
    }, [userId]);

    if (userId === null) {
        return (
            <h2>User ID not found</h2>
        );
    }

    return (
        <div className="inventory-page">
            <h1 className="inventory-title">My Inventory</h1>
            
            {/* Save / Load buttons */}
            <div style={{ marginTop: "20px" }}>
                <SaveInventoryButton inventory={inventory} userId={userId} />
                <LoadInventoryButton inventory={inventory} userId={userId} />
                <button onClick={() => setUserId(null)}>Logout</button>
            </div>

            {/* InventoryGrid receives the current grid and the Inventory instance */}
            <InventoryGrid grid={grid} inventory={inventory} placements={placements}/>
        </div>
    )
}

export default InventoryPage;