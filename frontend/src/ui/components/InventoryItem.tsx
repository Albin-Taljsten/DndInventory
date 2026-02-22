import type { PlacedItem } from "../../domain/Types";
import "../../scss/components/InventoryItem.scss"

interface Props {
    placement: PlacedItem;
}

const CELL_SIZE = 98;

const InventoryItem: React.FC<Props> = ({ placement }) => {
    
    const shape = placement.item.shape;

    const width = shape.length * CELL_SIZE;
    const height = shape[0].length * CELL_SIZE;

    return (
        <div
            className="inventory-item"
            style={{
                position: "absolute",
                left: placement.origin.x * CELL_SIZE,
                top: placement.origin.y * CELL_SIZE,
                width,
                height,
            }}
        >
            <h4>{placement.item.name}</h4>
        </div>
    );
};

export default InventoryItem;