import { useInventory } from "../../hooks/useInventory";
import InventoryGrid from "../components/InventoryGrid";
import "../../scss/layouts/InventoryPage.scss";
import { GRID_HEIGHT, GRID_WIDTH } from "../../globalVariables";
import LoadInventoryButton from "../components/LoadInventoryButton";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { load, save } from "../components/save_load";
import InventoryToolbar from "../components/InventoryToolbar";
import "../../scss/components/InventoryButtons.scss";
import ItemSelector from "../components/ItemSelector";
import { ITEM_DATABASE as itemDB, type ItemConfig } from "../../domain/itemDB";
import ItemInfo from "../components/ItemViewer";

const InventoryPage: React.FC = () => {
    const { inventory, grid, placements } = useInventory(GRID_WIDTH, GRID_HEIGHT);
    const { userId, setUserId } = useAuth();

    const [mode, setMode] = useState<"none" | "remove">("none");

    const [selectedItem, setSelectedItem] = useState<ItemConfig | null>(null);

    useEffect(() => {
        if (userId) load(userId, inventory);
    }, [userId]);

    useEffect(() => {
        if (!userId) return;

        const timeout = setTimeout(async () => {
            try {
                await save(userId, inventory.serialize(), GRID_WIDTH, GRID_HEIGHT);
                console.log("Inventory auto-saved");
            } catch (err) {
                console.error("Auto-save failed", err);
            }
        }, 500);

        return () => clearTimeout(timeout);
    }, [placements, userId]);

    if (userId === null) {
        return (
            <h2>User ID not found</h2>
        );
    }

    return (
        <div className="inventory-page">
            
            <div className="inventory-top-left">
                {/* Buttons or stats */}
            </div>

            <div className="inventory-title-wrapper">
                <h1 className="inventory-title">My Inventory</h1>
                
                {/* Save / Load buttons */}
                <div className="inventory-button-wrapper">
                    <LoadInventoryButton inventory={inventory} userId={userId} />
                    <button className="btn btn--sm" onClick={() => setUserId(null)}>Logout</button>

                    {/* Inventory Toolbar */}
                    <InventoryToolbar mode={mode} setMode={setMode} />
                </div>
            </div>

            <div className="inventory-top-right">
                {/* future buttons / equipment / gold / etc */}
            </div>


            <div className="inventory-selector">
                <div className="inventory-panel">
                    <ItemSelector items={itemDB}/>
                </div>
            </div>

            <div className="inventory-grid-container">
                <div className="inventory-grid-wrapper">
                    <InventoryGrid 
                        grid={grid} 
                        inventory={inventory} 
                        placements={placements} 
                        mode={mode}
                        onItemInspect={(itemKey) => setSelectedItem(itemDB[itemKey])}
                    />
                </div>
            </div>

            <div className="inventory-viewer">
                <div className="inventory-panel">
                    <ItemInfo item={selectedItem} />
                </div>
            </div>
    </div>
    );
}

export default InventoryPage;