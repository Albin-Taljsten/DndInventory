import { useState } from "react";
import type { ItemDB } from "../../domain/itemDB";
import "../../scss/components/ItemSelector.scss";
import "../../scss/base/rarity.scss";
import { CELL_SIZE } from "../../globalVariables";

interface Props {
    items: ItemDB; // ItemDB.ts keys
}

const ItemSelector: React.FC<Props> = ({ items }) => {
    const [search, setSearch] = useState("");

    const entries = Object.entries(items);

    const filtered = entries.filter(([_, item]) => 
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleDragStart = (e: React.DragEvent, itemKey: string) => {
        e.dataTransfer.setData("itemKey", itemKey);
        e.dataTransfer.effectAllowed = "copy";
    };

    return (
        <div className="item-selector">
            <input 
                placeholder="Search item..."
                value={search}
                onChange={e => setSearch(e.target.value)}
            />

            <div className="item-selector-scroll">
                <div className="item-selector-grid">
                    {filtered.map(([key, item]) => (
                        <div
                            key={key}
                            className={`selector-item ${item.rarity?.class || ''}`}
                        >
                            <img 
                                src={item.imgUrl} 
                                alt={item.name} 
                                style={{
                                    width: item.shape.length*(CELL_SIZE - 32),
                                    height: item.shape[0].length*(CELL_SIZE - 32)
                                }}
                                draggable
                                onDragStart={(e) => handleDragStart(e, key)}
                            />
                            <div className="selector-item-text">
                                <h4>{item.name}</h4>
                                <hr />
                                <p>{item.preview}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ItemSelector;