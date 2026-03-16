import type { ItemConfig } from "../../domain/itemDB";
import { CELL_SIZE } from "../../globalVariables";
import "../../scss/components/ItemInfo.scss";

interface Props {
    item: ItemConfig | null;
}

const ItemInfo: React.FC<Props> = ({ item }) => {
    
    if (!item) {
        return <p>Select an item to see details.</p>
    }

    return (
        <div className={`item-info ${item.rarity.class}`}>
            <h3>{item.name}</h3>
            <img src={item.imgUrl} width={item.shape.length*CELL_SIZE} height={item.shape[0].length*CELL_SIZE} />
            <p>{item.description}</p>
        </div>
    );
}

export default ItemInfo;