import type { Inventory } from "../../domain/Inventory";
import { load } from "./save_load";

interface Props {
    inventory: Inventory;
    userId: number;
}

const LoadInventoryButton: React.FC<Props> = ({ inventory, userId }) => {
    const handleLoad = async () => {
        try {
            await load(userId, inventory);
            alert("Inventory loaded!");
        } catch (err) {
            console.error(err);
            alert("Failed to load inventory");
        }
    };
    
    return <button className="btn btn--sm" onClick={handleLoad}>Load Inventory</button>;
};

export default LoadInventoryButton;