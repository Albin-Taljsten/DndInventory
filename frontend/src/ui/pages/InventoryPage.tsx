import { useInventory } from "../../hooks/useInventory";
import InventoryGrid from "../components/InventoryGrid";
import "../../scss/layouts/InventoryPage.scss";
import { GRID_HEIGHT, GRID_WIDTH } from "../../globalVariables";
import SaveInventoryButton from "../components/SaveInventoryButton";
import LoadInventoryButton from "../components/LoadInventoryButton";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { load } from "../components/save_load";
import InventoryToolbar from "../components/InventoryToolbar";
import "../../scss/components/InventoryButtons.scss";
import ItemSelector from "../components/ItemSelector";
import { ITEM_DATABASE as itemDB } from "../../domain/itemDB";

const InventoryPage: React.FC = () => {
    const { inventory, grid, placements } = useInventory(GRID_WIDTH, GRID_HEIGHT);
    const { userId, setUserId } = useAuth();

    const [mode, setMode] = useState<"none" | "remove">("none");

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
            <div className="inventory-button-wrapper">
                <SaveInventoryButton inventory={inventory} userId={userId} />
                <LoadInventoryButton inventory={inventory} userId={userId} />
                <button className="btn btn--sm" onClick={() => setUserId(null)}>Logout</button>

                {/* Inventory Toolbar */}
                <InventoryToolbar mode={mode} setMode={setMode} />
            </div>

            <div className="inventory-layout">
                {/* LEFT COLUMN */}
                <div className="inventory-column">
                    <div className="inventory-panel">
                        <ItemSelector items={Object.keys(itemDB)}/>
                    </div>
                </div>

                {/* CENTER COLUMN */}
                <div className="inventory-column">
                    <div
                        className="inventory-grid-wrapper"
                        style={{
                            height: "500px"
                        }}
                    >
                        {/* InventoryGrid */}
                        <InventoryGrid grid={grid} inventory={inventory} placements={placements} mode={mode}/>
                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="inventory-column">
                    <div className="inventory-panel">
                        <h3>Item Info</h3>
                        <p>Select an item to see details.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InventoryPage;