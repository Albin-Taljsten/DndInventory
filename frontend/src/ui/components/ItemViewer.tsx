import type { ItemConfig } from "../../domain/itemDB";
import { CELL_SIZE } from "../../globalVariables";
import "../../scss/components/ItemViewer.scss";

interface Props {
    item: ItemConfig | null;
}

const ItemInfo: React.FC<Props> = ({ item }) => {
    
    if (!item) {
        return (
            <div>
                <h2 style={{ marginBottom: "0.5rem", display: "flex", justifySelf: "center" }}>Item Viewer</h2>
                <p style={{ display: "flex", justifySelf: "center" }}>Ctrl + Click to view the details of an item</p>
            </div>
        );
    }

    return (
        <div className="item-viewer">
            <h2 style={{ marginBottom: "0.5rem" }}>Item Viewer</h2>
            <div className="item-info-scroll">
                <div className={`item-info ${item.rarity.class}`}>
                    <img 
                        src={item.imgUrl} 
                        style={{ 
                            width: item.shape.length*(CELL_SIZE - (item.shape.length >= 3 ? 64 : 32)), 
                            height: item.shape[0].length*(CELL_SIZE - (item.shape.length >= 3 ? 64 : 32))
                        }}
                    />
                    <div className="item-info-text">
                        <h3>{item.name}</h3>
                        <hr />
                        <p>{item.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemInfo;