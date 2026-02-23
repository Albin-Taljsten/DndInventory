import type { Inventory } from "../../domain/Inventory"
import { GRID_HEIGHT, GRID_WIDTH } from "../../globalVariables";
import { save } from "./save_load";

interface Props {
    inventory: Inventory;
    userId: number;
}

const SaveInventoryButton: React.FC<Props> = ({ inventory, userId }) => {
    const handleSave = async () => {
        try {
            await save(userId, inventory.serialize(), GRID_WIDTH, GRID_HEIGHT);
            alert("Inventory saved!");
        } catch (err) {
            console.error(err);
            alert("Failed to save inventory");
        }
    };
    return <button className="btn btn--sm" onClick={handleSave}>Save Inventory</button>;
};

export default SaveInventoryButton;